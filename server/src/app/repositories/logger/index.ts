import { CreateLoggerRequest } from './types'

export abstract class LoggerRepository {
  abstract log(request: CreateLoggerRequest): Promise<void>
}
