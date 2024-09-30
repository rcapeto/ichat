import { UserSession } from "@/services/http/entities/app/auth";

export type UpdateProfileRequest = {
  email: string;
  firstName: string;
  lastName: string;
  profileImage: string;
};

export type UpdateProfileResponse = {
  user: UserSession;
};
