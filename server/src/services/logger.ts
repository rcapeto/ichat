import fileSystem from 'node:fs'
import { CreateLogUseCase } from '~/app/use-cases/logger/create'

import { serverConfig } from '~/config/server'
import { DatabaseLoggerRepository } from '~/database/logger'

export type LoggerType = 'success' | 'error' | 'info'
export type LoggerParams = {
  type?: LoggerType
  message: string
}

export function logger({ message, type = 'info' }: LoggerParams) {
  const filePath = serverConfig.logFile
  const log = fileSystem.createWriteStream(filePath, {
    flags: 'a', // append
  })

  const date = new Date().toISOString()
  const logMessage = `\r\n[${date}] - {{ ${type.toUpperCase()} }} - ${message}`

  log.write(logMessage)
  log.end()
}

export function apiLogger() {
  const repository = new DatabaseLoggerRepository()
  return new CreateLogUseCase(repository)
}
