import { UserSession } from "@/services/http/entities/app/auth";

export type LoginRequest = {
  email: string;
  password: string;
};

export type LoginResponse = {
  session: UserSession;
  token: string;
};
