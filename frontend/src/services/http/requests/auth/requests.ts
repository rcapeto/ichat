import { endpoints } from "@/services/http/endpoints";
import { createApiRequest } from "@/services/http/requests/create-api-request";
import {
  LoginRequest,
  LoginResponse,
  RegisterRequest,
  RegisterResponse,
} from "./types";

const endpoint = endpoints.authentication;

export async function login(payload: LoginRequest) {
  return await createApiRequest<LoginRequest, LoginResponse>({
    method: "post",
    endpoint: endpoint.login,
    body: payload,
  });
}

export async function register(payload: RegisterRequest) {
  return await createApiRequest<RegisterRequest, RegisterResponse>({
    method: "post",
    endpoint: endpoint.register,
    body: payload,
  });
}
