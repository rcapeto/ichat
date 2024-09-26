import { Request, Response } from 'express'
import { Data } from '~/entities/apiResponse'
import { APILoggerType } from '~/enums/apiLoggerType'
import { Status } from '~/enums/status'
import { apiLogger } from '~/services/logger'
import { dispatchResponse } from '~/utils/dispatchResponse'
import { getAPIError } from '~/utils/getApiError'
import { BasicController } from './base'

type CreateControllerConfig = {
  loggerAction: string
  withLog?: boolean
  successStatus: Status
}

type ControllerCallbackParams<UseCase> = {
  useCase: UseCase
  request: Request
  response: Response
}
type ControllerCallback<UseCase> = (
  params: ControllerCallbackParams<UseCase>,
) => Promise<Data>

export function createController<UseCase>(
  config: CreateControllerConfig,
  apiHandler: ControllerCallback<UseCase>,
) {
  const { loggerAction, successStatus, withLog = true } = config
  const logger = apiLogger()

  return class Controller implements BasicController {
    constructor(private useCase: UseCase) {}

    async handler(request: Request, response: Response): Promise<unknown> {
      try {
        const data = await apiHandler({
          request,
          response,
          useCase: this.useCase,
        })

        if (withLog) {
          await logger.execute({
            action: loggerAction,
            type: APILoggerType.SUCCESS,
            payload: JSON.stringify(data),
          })
        }

        return response.status(successStatus).json(dispatchResponse(data))
      } catch (error) {
        const apiError = getAPIError(error)

        if (withLog) {
          await logger.execute({
            action: loggerAction,
            type: APILoggerType.ERROR,
            payload: JSON.stringify({
              ...request.body,
              error,
            }),
          })
        }

        return response.status(apiError.status).json(dispatchResponse(apiError))
      }
    }
  }
}
