import { describe } from '@jest/globals'
import { serverConfig } from '~/config/server'
import { TestUserRepository } from '~/tests/users'
import { makeUser } from '~/tests/utils'
import { FindManyUsersUseCase } from './index'

const repository = new TestUserRepository()
const useCase = new FindManyUsersUseCase(repository)

describe('FindManyUsersUseCase', () => {
  beforeEach(() => {
    repository.resetDB()
  })
  it('should be able search user by first name', async () => {
    const firstName = 'any-value'
    const me = makeUser({ firstName: 'me' })
    const maxLength = 3

    repository.setNewUser(me)

    for (let i = 0; i < maxLength; i++) {
      const user = makeUser({ firstName: firstName.toLowerCase() })
      repository.setNewUser(user)
    }

    const { count } = await useCase.execute({
      userId: me.id,
      query: firstName,
    })

    expect(count).toBe(maxLength)
  })

  it('should be able search user by last name', async () => {
    const lastName = 'any-value'
    const me = makeUser({ lastName: 'me' })
    const maxLength = 3

    repository.setNewUser(me)

    for (let i = 0; i < maxLength; i++) {
      const user = makeUser({ lastName: lastName.toLowerCase() })
      repository.setNewUser(user)
    }

    const { count } = await useCase.execute({
      userId: me.id,
      query: lastName,
    })

    expect(count).toBe(maxLength)
  })

  it('should be able search user by email', async () => {
    const email = 'any-value'
    const me = makeUser({ email: 'me' })
    const maxLength = 3

    repository.setNewUser(me)

    for (let i = 0; i < maxLength; i++) {
      const user = makeUser({ email: email.toLowerCase() })
      repository.setNewUser(user)
    }

    const { count } = await useCase.execute({
      userId: me.id,
      query: email,
    })

    expect(count).toBe(maxLength)
  })

  it('should be get correct pagination number and results size', async () => {
    const me = makeUser({ email: 'me' })
    const maxLength = 20

    repository.setNewUser(me)

    for (let i = 0; i < maxLength; i++) {
      const user = makeUser()
      repository.setNewUser(user)
    }

    const { count, totalPages } = await useCase.execute({
      userId: me.id,
    })

    expect(count).toBe(maxLength)
    expect(totalPages).toBe(Math.ceil(count / serverConfig.numberOfDataPerPage))
  })

  it('should be able not found my user', async () => {
    const me = makeUser()

    repository.setNewUser(me)

    const { count, users } = await useCase.execute({
      userId: me.id,
    })

    expect(count).toBe(0)
    expect(users).toHaveLength(0)
  })
})
