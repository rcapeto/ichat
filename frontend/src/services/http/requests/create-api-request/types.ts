import { AxiosRequestConfig } from "axios";

export type ApiMethod = "delete" | "get" | "patch" | "put" | "post";

export type CreateAPIRequestConfig<Request> =
  | GetRequest<Request>
  | PostRequest<Request>
  | PatchRequest<Request>
  | PutRequest<Request>
  | DeleteRequest<Request>;

type RequestConfigWithConfig = {
  requestConfig?: AxiosRequestConfig;
};

type GetRequest<Request> = RequestConfigWithConfig & {
  method: "get";
  endpoint: string;
  requestConfig?: AxiosRequestConfig;
  body?: Request | FormData;
};

type PostRequest<Request> = RequestConfigWithConfig & {
  method: "post";
  endpoint: string;
  requestConfig?: AxiosRequestConfig;
  body: Request | FormData;
};

type PatchRequest<Request> = RequestConfigWithConfig & {
  method: "patch";
  endpoint: string;
  requestConfig?: AxiosRequestConfig;
  body: Request | FormData;
};

type PutRequest<Request> = RequestConfigWithConfig & {
  method: "put";
  endpoint: string;
  requestConfig?: AxiosRequestConfig;
  body: Request | FormData;
};

type DeleteRequest<Request> = RequestConfigWithConfig & {
  method: "delete";
  endpoint: string;
  requestConfig?: AxiosRequestConfig;
  body?: Request | FormData;
};
