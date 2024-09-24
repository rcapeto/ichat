import { LoggerRepository } from '~/app/repositories/logger'
import { CreateLoggerRequest } from '~/app/repositories/logger/types'
import { client } from '~/database/client'

export class DatabaseLoggerRepository implements LoggerRepository {
  async log(request: CreateLoggerRequest): Promise<void> {
    const payload = request.payload ? JSON.stringify(request.payload) : ''

    await client.logger.create({
      data: {
        action: request.action,
        type: request.type,
        payload,
      },
    })
  }
}
