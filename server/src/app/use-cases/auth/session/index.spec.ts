import { describe } from '@jest/globals'
import { ApiError } from '~/entities/apiError'
import { Messages } from '~/messages'
import { TokenService } from '~/services/token'
import { TestAuthRepository } from '~/tests/auth'
import { makeUser } from '~/tests/utils'
import { dispatchNotFoundError } from '~/utils/dispatchError'
import { SessionUseCase } from './index'

const repository = new TestAuthRepository()
const useCase = new SessionUseCase(repository)

describe('SessionUseCase', () => {
  it('should not be able get an user when user does not exists', () => {
    const user = makeUser()
    const token = TokenService.createToken({ subject: user.id })

    useCase
      .execute({
        token,
      })
      .catch((err: ApiError) => {
        const error = dispatchNotFoundError(Messages.DOES_NOT_FOUND_USER)

        expect(err.errorType).toBe(error.errorType)
        expect(err.message).toBe(error.message)
        expect(err.status).toBe(error.status)
      })
  })

  it('should get an user', async () => {
    const user = makeUser()
    const token = TokenService.createToken({ subject: user.id })

    repository.setNewUser(user)

    const { session } = await useCase.execute({ token })

    expect(session.firstName).toBe(user.firstName)
    expect(session.id).toBe(user.id)
  })
})
