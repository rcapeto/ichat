/* eslint-disable prettier/prettier */
import {
  LoginRequest,
  LoginResponse,
  RegisterRequest,
  RegisterResponse,
} from './types';

export abstract class AuthRepository {
  abstract login(request: LoginRequest): Promise<LoginResponse>
  abstract register(request: RegisterRequest): Promise<RegisterResponse>
}
