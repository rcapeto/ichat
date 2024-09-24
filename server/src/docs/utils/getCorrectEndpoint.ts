import { serverConfig } from '~/config/server'

export function getCorrectEndpoint(endpoint: string) {
  const version = serverConfig.version

  return `${version}${endpoint}`
}
