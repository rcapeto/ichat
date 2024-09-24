import { NextFunction, Request, Response } from 'express'
import { TokenService } from '~/services/token'
import { dispatchRequiredAuthorizationError } from '~/utils/dispatchError'
import { dispatchResponse } from '~/utils/dispatchResponse'

export function ensureUserIsAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction,
) {
  const header = request.headers
  const token = header.authorization

  const error = dispatchRequiredAuthorizationError()

  if (!token) {
    return response.status(error.status).json(dispatchResponse(error))
  }

  const userId = TokenService.verifyToken(token)

  if (!userId) {
    request.userId = ''

    return response.status(error.status).json(dispatchResponse(error))
  }

  request.userId = userId

  next()
}
