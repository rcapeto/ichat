import { LoggerRepository } from '~/app/repositories/logger'
import { CreateLoggerRequest } from '~/app/repositories/logger/types'
import { Logger } from '~/entities/app/Logger'
import { makeLog } from './utils'

export class TestLoggerRepository implements LoggerRepository {
  private logs: Logger[] = []

  async log(request: CreateLoggerRequest): Promise<void> {
    this.logs.push(
      makeLog({
        action: request.action,
        payload: request.payload,
        type: request.type as string,
      }),
    )
  }

  count() {
    return this.logs.length
  }
}
