// eslint-disable-next-line prettier/prettier
import { FindManyUserRequest, FindManyUserResponse } from './types';

export abstract class UserRepository {
  abstract findMany(request: FindManyUserRequest): Promise<FindManyUserResponse>
}
