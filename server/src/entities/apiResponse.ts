import { ApiError, InitializeApiError } from './apiError'

export type Data = ApiError | Record<string, unknown>
export type ApiResponseInterface<Response> = {
  ok: boolean
  data: InitializeApiError | Response
}

export class ApiResponse {
  ok: boolean
  data: Data

  constructor(data: Data) {
    this.data = data
    this.ok = !('errorType' in data)
  }

  setOk(newValue: boolean) {
    this.ok = newValue
  }
}
