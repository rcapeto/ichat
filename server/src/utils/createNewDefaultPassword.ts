import { serverConfig } from '~/config/server'

export function createNewDefaultPassword(userDocument: string) {
  const prefix = userDocument.slice(0, 4)

  return `${prefix}${serverConfig.suffixNewPassword}`
}
