import { UserSession } from "@/services/http/entities/app/auth";
import {
  LoginResponse,
  RegisterResponse,
} from "@/services/http/requests/auth/types";
import { InitialApiState } from "@/store/types";

export type AuthStoreState = {
  auth: InitialApiState<LoginResponse>;
  session: InitialApiState<UserSession>;
  register: InitialApiState<RegisterResponse>;
};
