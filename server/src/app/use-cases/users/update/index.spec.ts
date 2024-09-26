import { describe } from '@jest/globals'
import { ApiError } from '~/entities/apiError'
import { ErrorType } from '~/enums/errorType'
import { Status } from '~/enums/status'
import { Messages } from '~/messages'
import { TestUserRepository } from '~/tests/users'
import { makeUser } from '~/tests/utils'
import { dispatchError, dispatchNotFoundError } from '~/utils/dispatchError'
import { UpdateUserUseCase } from './index'

const repository = new TestUserRepository()
const useCase = new UpdateUserUseCase(repository)

describe('UpdateUserUseCase', () => {
  beforeEach(() => {
    repository.resetDB()
  })

  it('should be able update only user firstName', async () => {
    const me = makeUser()
    const newData = 'data-example'

    repository.setNewUser(me)

    const { user } = await useCase.execute({
      userId: me.id,
      firstName: newData,
    })

    expect(user.firstName).toBe(newData)
    expect(me.lastName).toBe(user.lastName)
    expect(me.profileImage).toBe(user.profileImage)
    expect(me.email).toBe(user.email)
  })

  it('should be able update only user lastName', async () => {
    const me = makeUser()
    const newData = 'data-example'

    repository.setNewUser(me)

    const { user } = await useCase.execute({
      userId: me.id,
      lastName: newData,
    })

    expect(user.lastName).toBe(newData)
    expect(me.firstName).toBe(user.firstName)
    expect(me.profileImage).toBe(user.profileImage)
    expect(me.email).toBe(user.email)
  })

  it('should be able update only user profileImage', async () => {
    const me = makeUser()
    const newData = 'data-example'

    repository.setNewUser(me)

    const { user } = await useCase.execute({
      userId: me.id,
      profileImage: newData,
    })

    expect(user.profileImage).toBe(newData)
    expect(me.firstName).toBe(user.firstName)
    expect(me.lastName).toBe(user.lastName)
    expect(me.email).toBe(user.email)
  })

  it('should be able update only user email', async () => {
    const me = makeUser()
    const newData = 'any_correct@email.com'

    repository.setNewUser(me)

    const { user } = await useCase.execute({
      userId: me.id,
      email: newData,
    })

    expect(user.email).toBe(newData)
    expect(me.firstName).toBe(user.firstName)
    expect(me.lastName).toBe(user.lastName)
    expect(me.profileImage).toBe(user.profileImage)
  })

  it('should be able reset user profileImage', async () => {
    const me = makeUser({ profileImage: 'real-image-path' })
    const emptyImage = ''

    repository.setNewUser(me)

    const { user } = await useCase.execute({
      userId: me.id,
      profileImage: emptyImage,
    })

    expect(user.profileImage).toBe(emptyImage)
  })

  it('should not update if user does not exists', () => {
    const me = makeUser()
    const newValue = ''

    useCase
      .execute({
        userId: me.id,
        firstName: newValue,
      })
      .catch((err: ApiError) => {
        const error = dispatchNotFoundError(Messages.DOES_NOT_FOUND_USER)

        expect(err.errorType).toBe(error.errorType)
        expect(err.status).toBe(error.status)
        expect(err.message).toBe(error.message)
      })
  })

  it('should not update email if exists someone using the same email', () => {
    const me = makeUser()
    const email = 'any_email@email.com'

    const otherUser = makeUser({ email })

    repository.setNewUser(me, otherUser)

    useCase
      .execute({
        userId: me.id,
        email,
      })
      .catch((err: ApiError) => {
        const error = dispatchError({
          errorType: ErrorType.UNAUTHORIZED,
          message: Messages.EMAIL_IS_ALREADY_IN_REGISTERED,
          status: Status.UNAUTHORIZED,
        })

        expect(err.errorType).toBe(error.errorType)
        expect(err.status).toBe(error.status)
        expect(err.message).toBe(error.message)
      })
  })
})
