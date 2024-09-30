import { api } from "@/services/http/api";
import { endpoints } from "@/services/http/endpoints";
import { APIResponse } from "@/services/http/types/api-response";
import { LoginRequest, LoginResponse } from "./types";

type LoginData = APIResponse<LoginResponse>;

export async function login(payload: LoginRequest) {
  const { data: response } = await api.post<LoginData>(
    endpoints.authentication.login,
    payload
  );

  if (!response.ok) {
    throw new Error(response.data.message);
  }

  return response.data;
}
