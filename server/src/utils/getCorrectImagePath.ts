import { serverConfig } from '~/config/server'

const folders = serverConfig.uploadFolders

type Config = {
  isMobile?: boolean
  imagePath?: string | null
  folder?: keyof typeof folders
}

export function getCorrectImagePath(config: Config): string {
  const PORT = serverConfig.PORT
  const isMobile = config?.isMobile ?? false
  const folderPath = folders[config.folder ?? 'users']

  if (!config.imagePath) {
    return ''
  }

  const mobileBasePath = 'http://192.168.0.109'
  const webBasePath = 'http://localhost'
  const baseURL = isMobile ? mobileBasePath : webBasePath

  return `${baseURL}:${PORT}/${folderPath}/${config.imagePath}`
}
