/* eslint-disable prettier/prettier */
import {
  FindManyUserRequest,
  FindManyUserResponse,
  UpdateUserPasswordRequest,
  UpdateUserPasswordResponse,
  UpdateUserRequest,
  UpdateUserResponse,
} from './types';

export abstract class UserRepository {
  abstract findMany(request: FindManyUserRequest): Promise<FindManyUserResponse>
  abstract update(request: UpdateUserRequest): Promise<UpdateUserResponse>
  abstract updatePassword(
    request: UpdateUserPasswordRequest,
  ): Promise<UpdateUserPasswordResponse>
}
