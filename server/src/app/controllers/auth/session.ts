import { Request, Response } from 'express'
import { BasicController } from '~/app/controllers/base'
import { SessionUseCase } from '~/app/use-cases/auth/session'
import { CreateLogUseCase } from '~/app/use-cases/logger/create'
import { APILoggerType } from '~/enums/apiLoggerType'
import { Status } from '~/enums/status'
import { dispatchResponse } from '~/utils/dispatchResponse'
import { getAPIError } from '~/utils/getApiError'

const loggerAction = 'When someone try get current session'

export class SessionController implements BasicController {
  constructor(
    private useCase: SessionUseCase,
    private logger?: CreateLogUseCase,
  ) {}

  async handler(request: Request, response: Response): Promise<unknown> {
    try {
      const data = await this.useCase.execute(request.body)

      await this.logger.execute({
        action: loggerAction,
        type: APILoggerType.SUCCESS,
        payload: data,
      })

      return response.status(Status.OK).json(dispatchResponse(data))
    } catch (error) {
      const apiError = getAPIError(error)

      await this.logger.execute({
        action: loggerAction,
        type: APILoggerType.ERROR,
        payload: {
          ...request.body,
          error,
        },
      })

      return response.status(apiError.status).json(dispatchResponse(apiError))
    }
  }
}
