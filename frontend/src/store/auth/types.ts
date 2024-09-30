import { LoginResponse } from "@/services/http/requests/auth/types";
import { InitialApiState } from "@/store/types";

export type State = {
  auth: InitialApiState<LoginResponse>;
};
