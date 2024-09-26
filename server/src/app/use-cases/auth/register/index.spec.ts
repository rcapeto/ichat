import { describe } from '@jest/globals'
import { ApiError } from '~/entities/apiError'
import { ErrorType } from '~/enums/errorType'
import { Messages } from '~/messages'
import { TestAuthRepository } from '~/tests/auth'
import { makeUser, SECRET_PASSWORD } from '~/tests/utils'
import { RegisterUseCase } from './index'

const repository = new TestAuthRepository()
const useCase = new RegisterUseCase(repository)

describe('RegisterUseCase', () => {
  beforeEach(() => {
    repository.resetDB()
  })

  it('should not be able create new account if email is already used', () => {
    const user = makeUser({ password: SECRET_PASSWORD })

    repository.setNewUser(user)

    useCase
      .execute({
        confirmPassword: SECRET_PASSWORD,
        password: user.password,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
      })
      .catch((err: ApiError) => {
        expect(err.message).toBe(Messages.EMAIL_IS_ALREADY_IN_REGISTERED)
      })
  })

  it('should not be able create new account if password and confirm password is not the same', () => {
    const user = makeUser({ password: SECRET_PASSWORD })

    useCase
      .execute({
        confirmPassword: `${SECRET_PASSWORD}-ANY`,
        password: user.password,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
      })
      .catch((err: ApiError) => {
        expect(err.message).toBe(Messages.PASSWORD_MISS_MATCH)
      })
  })

  it('should not be able create new account if any field is empty', () => {
    const user = makeUser({ password: SECRET_PASSWORD })

    useCase
      .execute({
        confirmPassword: SECRET_PASSWORD,
        password: user.password,
        email: '',
        firstName: user.firstName,
        lastName: user.lastName,
      })
      .catch((err: ApiError) => {
        expect(err.errorType).toBe(ErrorType.VALIDATION)
      })
  })

  it('should be able create new account', async () => {
    const user = makeUser({ password: SECRET_PASSWORD })

    await useCase.execute({
      confirmPassword: SECRET_PASSWORD,
      password: user.password,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
    })

    expect(repository.count).toBe(1)
  })
})
