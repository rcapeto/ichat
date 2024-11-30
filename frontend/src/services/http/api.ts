import { applicationConfig } from "@/config/application";
import { Messages } from "@/messages";
import axios from "axios";
import { ErrorType } from "./entities/error-type";

const apiVersion = applicationConfig.api.version

export const api = axios.create({
  baseURL: `http://localhost:3333/${apiVersion}`,
  validateStatus: () => true,
});

api.interceptors.request.use((request) => {
  if (!navigator.onLine) {
    throw new Error("Verifique sua conexão e tente novamente");
  }

  return request;
});

api.interceptors.response.use((response) => {
  const { data, ok } = response.data;

  const isError = !ok;
  const isUnauthorized = data?.errorType === ErrorType.REQUIRED_AUTHORIZATION;

  if (isError && isUnauthorized) {
    throw new Error(Messages.REQUIRED_AUTHORIZATION);
  }
  return response;
});

export function setApiHeader(key: string, value: string) {
  api.defaults.headers[key] = value;
}
