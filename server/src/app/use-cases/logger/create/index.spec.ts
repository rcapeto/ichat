import { describe, expect, it } from '@jest/globals'
import { ApiError } from '~/entities/apiError'
import { APILoggerType } from '~/enums/apiLoggerType'
import { ErrorType } from '~/enums/errorType'
import { TestLoggerRepository } from '~/tests/logger'
import { CreateLogUseCase } from './index'

const repository = new TestLoggerRepository()
const useCase = new CreateLogUseCase(repository)

describe('Logger Test', () => {
  it('should not be able create a new logger when does not have action', async () => {
    useCase
      .execute({
        action: '',
        type: APILoggerType.SUCCESS,
        payload: '',
      })
      .catch((error: ApiError) => {
        expect(error.errorType).toBe(ErrorType.VALIDATION)
      })
  })
  it('should not be able create a new logger when does not have type', async () => {
    useCase
      .execute({
        action: 'default action',
        type: '' as any,
        payload: '',
      })
      .catch((error: ApiError) => {
        expect(error.errorType).toBe(ErrorType.VALIDATION)
      })
  })

  it('should be able create a new log', async () => {
    await useCase.execute({
      action: 'default action',
      type: APILoggerType.SUCCESS,
      payload: '',
    })

    expect(repository.count()).toBe(1)
  })
})
