import { LoginRequest, LoginResponse } from './types';

export abstract class AuthRepository {
  abstract login(request: LoginRequest): Promise<LoginResponse>
}
