import { APILoggerType } from '~/enums/apiLoggerType'

export type CreateLoggerRequest = {
  action: string
  type: APILoggerType
  payload: string
}
