import {
  CreateEmployeeRequest,
  CreateEmployeeResponse,
  FindManyEmployeeRequest,
  FindManyEmployeeResponse,
} from './types'

export abstract class EmployeeRepository {
  abstract create(
    request: CreateEmployeeRequest,
  ): Promise<CreateEmployeeResponse>

  abstract findMany(
    request: FindManyEmployeeRequest,
  ): Promise<FindManyEmployeeResponse>
}
