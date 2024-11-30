import {
  UpdatePasswordResponse,
  UpdateProfileResponse,
} from "@/services/http/requests/app/profile/types";
import { InitialApiState } from "@/store/types";

export type UserStoreState = {
  updateUser: InitialApiState<UpdateProfileResponse>;
  updateUserPassword: InitialApiState<UpdatePasswordResponse>;
};
