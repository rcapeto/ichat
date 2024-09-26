// eslint-disable-next-line prettier/prettier
import { FindManyUserRequest, FindManyUserResponse, UpdateUserRequest, UpdateUserResponse } from './types';

// TO-DO: endpoint para alterar a senha
export abstract class UserRepository {
  abstract findMany(request: FindManyUserRequest): Promise<FindManyUserResponse>
  abstract update(request: UpdateUserRequest): Promise<UpdateUserResponse>
}
