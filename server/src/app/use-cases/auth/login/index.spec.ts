import { describe } from '@jest/globals'
import { ApiError } from '~/entities/apiError'
import { Messages } from '~/messages'
import { TestAuthRepository } from '~/tests/auth'
import { makeUser } from '~/tests/utils'
import { dispatchValidationError } from '~/utils/dispatchError'
import { LoginUseCase } from './index'

const repository = new TestAuthRepository()
const useCase = new LoginUseCase(repository)

describe('LoginUseCase', () => {
  it('should not be able get user when does not exists email in request payload', () => {
    useCase
      .execute({ email: '', password: 'any-password' })
      .catch((err: ApiError) => {
        const error = dispatchValidationError('error-message')

        expect(err.errorType).toBe(error.errorType)
        expect(err.status).toBe(error.status)
      })
  })
  it('should not be able get user when does not exists password in request payload', () => {
    useCase
      .execute({ email: 'email@email.com', password: '' })
      .catch((err: ApiError) => {
        const error = dispatchValidationError('error-message')

        expect(err.errorType).toBe(error.errorType)
        expect(err.status).toBe(error.status)
      })
  })

  it('should not be able get user when email field in request payload is not a valid email', () => {
    useCase
      .execute({ email: 'not-valid-email', password: 'any-password' })
      .catch((err: ApiError) => {
        const error = dispatchValidationError(
          Messages.MUST_BE_AN_EMAIL('email'),
        )

        expect(err.errorType).toBe(error.errorType)
        expect(err.status).toBe(error.status)
        expect(err.message).toBe(error.message)
      })
  })

  it('should not be able get user session data, when user does not found', () => {
    const user = makeUser()

    useCase
      .execute({
        email: user.email,
        password: user.password,
      })
      .catch((err: ApiError) => {
        expect(err.message).toBe(Messages.DOES_NOT_FOUND_USER)
      })
  })

  it('should be able get user session data', async () => {
    const user = makeUser()

    repository.setNewUser(user)

    const { session, token } = await useCase.execute({
      email: user.email,
      password: user.password,
    })

    expect(session.id).toBe(user.id)
    expect(session.email).toBe(user.email)
    expect(token).toBeTruthy()
  })
})
