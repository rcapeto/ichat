import { ApiResponse, Data } from '~/entities/apiResponse'

export function dispatchResponse(data: Data) {
  return new ApiResponse(data)
}
