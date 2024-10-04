import { faker } from '@faker-js/faker'
import { client } from '~/database/client'
import { PasswordService } from '~/services/password'

async function main() {
  for (let i = 0; i < 30; i++) {
    const password = `@FakePassword${i}`

    const encryptedPassword = await PasswordService.encryptPassword({
      password,
    })

    await client.user.create({
      data: {
        email: faker.internet.email().toLowerCase(),
        first_name: faker.person.firstName(),
        last_name: faker.person.lastName(),
        password: encryptedPassword,
      },
    })
  }
}

main()
