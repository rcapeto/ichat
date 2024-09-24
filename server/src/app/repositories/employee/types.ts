import { QueryParams } from '~/app/repositories/types'
import { EmployeeSession } from '~/entities/app/employee'

export type CreateEmployeeRequest = {
  email: string
  firstName: string
  lastName: string
  document: string
  userId: string
}

export type CreateEmployeeResponse = {
  id: string
}

export type FindManyEmployeeRequest = QueryParams & {
  loggedEmployeeId: string
}

export type FindManyEmployeeResponse = {
  currentPage: number
  total: number
  perPage: number
  employees: EmployeeSession[]
}
