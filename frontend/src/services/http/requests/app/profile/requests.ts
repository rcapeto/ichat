import { endpoints } from "@/services/http/endpoints";
import { createApiRequest } from "@/services/http/requests/create-api-request";
import { UpdateProfileRequest, UpdateProfileResponse } from "./types";

const endpoint = endpoints.app.user;

export async function updateUser(payload: UpdateProfileRequest) {
  return await createApiRequest<UpdateProfileRequest, UpdateProfileResponse>({
    endpoint: endpoint.update,
    method: "put",
    body: payload,
  });
}
