import { LoggerRepository } from '~/app/repositories/logger'
import { CreateLoggerRequest } from '~/app/repositories/logger/types'
import { APILoggerType } from '~/enums/apiLoggerType'
import { getAPIError } from '~/utils/getApiError'
import { validation } from './validation'

type Request = CreateLoggerRequest

export class CreateLogUseCase {
  constructor(private repository: LoggerRepository) {}

  async execute(request: Request): Promise<void> {
    try {
      const { payload, ...params } = request
      const { action, type } = validation.parse(params)

      return await this.repository.log({
        action,
        type: type as APILoggerType,
        payload,
      })
    } catch (err) {
      throw getAPIError(err)
    }
  }
}
