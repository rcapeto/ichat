import { describe } from '@jest/globals'
import { randomUUID } from 'crypto'
import { ApiError } from '~/entities/apiError'
import { ErrorType } from '~/enums/errorType'
import { Status } from '~/enums/status'
import { Messages } from '~/messages'
import { TestUserRepository } from '~/tests/users'
import { makeUser, SECRET_PASSWORD } from '~/tests/utils'
import { dispatchError, dispatchNotFoundError } from '~/utils/dispatchError'
import { UpdatePasswordUserUseCase } from './index'

const repository = new TestUserRepository()
const useCase = new UpdatePasswordUserUseCase(repository)

describe('UpdatePasswordUserUseCase', () => {
  beforeEach(() => {
    repository.resetDB()
  })

  it('should not update user password if user does not exists', () => {
    const me = makeUser()
    const newPassword = SECRET_PASSWORD

    useCase
      .execute({
        password: me.password,
        newPassword,
        userId: me.id,
      })
      .catch((err: ApiError) => {
        const error = dispatchNotFoundError(Messages.DOES_NOT_FOUND_USER)

        expect(err.errorType).toBe(error.errorType)
        expect(err.status).toBe(error.status)
        expect(err.message).toBe(error.message)
      })
  })

  it('should not update user password if new password is the same', () => {
    const me = makeUser({
      password: SECRET_PASSWORD,
    })
    const newPassword = SECRET_PASSWORD

    repository.setNewUser(me)

    useCase
      .execute({
        password: SECRET_PASSWORD,
        newPassword,
        userId: me.id,
      })
      .catch((err: ApiError) => {
        const error = dispatchError({
          errorType: ErrorType.ERROR,
          message: Messages.CHANGE_PASSWORD_ERROR,
          status: Status.BAD_REQUEST,
        })

        expect(err.errorType).toBe(error.errorType)
        expect(err.status).toBe(error.status)
        expect(err.message).toBe(error.message)
      })
  })

  it('should not update user password if user does not know the current password', () => {
    const me = makeUser({
      password: randomUUID(),
    })
    const newPassword = SECRET_PASSWORD

    repository.setNewUser(me)

    useCase
      .execute({
        password: SECRET_PASSWORD,
        newPassword,
        userId: me.id,
      })
      .catch((err: ApiError) => {
        const error = dispatchError({
          errorType: ErrorType.ERROR,
          message: Messages.CHANGE_PASSWORD_MUST_KNOW_OLD,
          status: Status.BAD_REQUEST,
        })

        expect(err.errorType).toBe(error.errorType)
        expect(err.status).toBe(error.status)
        expect(err.message).toBe(error.message)
      })
  })
})
