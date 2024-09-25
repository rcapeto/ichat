import { Request, Response } from 'express'
import { BasicController } from '~/app/controllers/base'
import { CreateLogUseCase } from '~/app/use-cases/logger/create'
import { FindManyUsersUseCase } from '~/app/use-cases/users/findMany'
import { APILoggerType } from '~/enums/apiLoggerType'
import { Status } from '~/enums/status'
import { dispatchResponse } from '~/utils/dispatchResponse'
import { getAPIError } from '~/utils/getApiError'

const loggerAction = 'When someone try to get users'

export class FindManyUsersController implements BasicController {
  constructor(
    private useCase: FindManyUsersUseCase,
    private logger?: CreateLogUseCase,
  ) {}

  async handler(request: Request, response: Response): Promise<unknown> {
    try {
      const page = request.query.page as string
      const query = request.query.search as string

      const data = await this.useCase.execute({
        userId: request.userId,
        page,
        query,
      })

      await this.logger.execute({
        action: loggerAction,
        type: APILoggerType.SUCCESS,
        payload: JSON.stringify(data),
      })

      return response.status(Status.OK).json(dispatchResponse(data))
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
