import { api } from "@/services/http/api";
import { APIResponse } from "@/services/http/types/api-response";
import { CreateAPIRequestConfig } from "./types";

export async function createApiRequest<Request, Response>(
  config: CreateAPIRequestConfig<Request>
) {
  const { method = "get", endpoint, requestConfig } = config;
  const isWithoutBody = method === "get" || method === "delete";

  if (isWithoutBody) {
    const { data: response } = await api[method]<APIResponse<Response>>(
      endpoint,
      requestConfig
    );

    if (!response.ok) {
      throw new Error(response.data.message);
    }

    return response.data;
  }

  const { data: response } = await api[method]<APIResponse<Response>>(
    endpoint,
    config.body,
    requestConfig
  );

  if (!response.ok) {
    throw new Error(response.data.message);
  }

  return response.data;
}
