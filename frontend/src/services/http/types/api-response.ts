import { ErrorType } from "@/services/http/entities/error-type";
import { Status } from "@/services/http/entities/status";

type ErrorResponse = {
  message: string;
  status: Status;
  errorType: ErrorType;
};

type APIErrorResponse = {
  ok: false;
  data: ErrorResponse;
};

type APISuccessResponse<Data> = {
  ok: true;
  data: Data;
};

export type APIResponse<Data> = APISuccessResponse<Data> | APIErrorResponse;
