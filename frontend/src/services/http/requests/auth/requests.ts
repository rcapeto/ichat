import { endpoints } from "@/services/http/endpoints";
import { createApiRequest } from "@/services/http/requests/create-api-request";
import {
  LoginRequest,
  LoginResponse,
  RegisterRequest,
  RegisterResponse,
  SessionRequest,
  SessionResponse,
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

export async function session(params: SessionRequest) {
  return await createApiRequest<SessionRequest, SessionResponse>({
    method: "get",
    endpoint: endpoint.session,
    requestConfig: {
      params,
    },
  });
}
