import { Request, Response } from 'express'
import { BasicController } from '~/app/controllers/base'
import { RegisterUseCase } from '~/app/use-cases/auth/register'
import { CreateLogUseCase } from '~/app/use-cases/logger/create'
import { APILoggerType } from '~/enums/apiLoggerType'
import { Status } from '~/enums/status'
import { dispatchResponse } from '~/utils/dispatchResponse'
import { getAPIError } from '~/utils/getApiError'

const loggerAction = 'When someone try to register'

export class RegisterController implements BasicController {
  constructor(
    private useCase: RegisterUseCase,
    private logger?: CreateLogUseCase,
  ) {}

  async handler(request: Request, response: Response): Promise<unknown> {
    try {
      await this.useCase.execute(request.body)

      await this.logger.execute({
        action: loggerAction,
        type: APILoggerType.SUCCESS,
        payload: '',
      })

      return response.status(Status.CREATED).json(dispatchResponse({}))
    } catch (error) {
      const apiError = getAPIError(error)

      await this.logger.execute({
        action: loggerAction,
        type: APILoggerType.ERROR,
        payload: JSON.stringify({
          ...request.body,
          error,
        }),
      })

      return response.status(apiError.status).json(dispatchResponse(apiError))
    }
  }
}
