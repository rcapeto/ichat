import { Request, Response } from 'express'

export abstract class BasicController {
  abstract handler(request: Request, response: Response): Promise<unknown>
}
