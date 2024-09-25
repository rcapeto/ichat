import { Languages } from '~/enums/langs'

const env = process.env

export const serverConfig = {
  PORT: env.SERVER_PORT ?? '3333',
  logFile: 'tmp.txt',
  uploadFolders: {
    users: env.UPLOADS_IMAGES_USER ?? 'upload_users_image',
    message: env.UPLOADS_MESSAGES_ASSETS ?? 'upload_messages_image',
  },
  tokenSecretKet: env.TOKEN_SECRET_KEY ?? 'top-secret',
  version: 'v1',
  headers: {
    totalPages: 'X-TOTAL-PAGES',
  },
  suffixNewPassword: '@new',
  numberOfDataPerPage: 10,
  withLogger: true,
  defaultLang: Languages.PT,
}
