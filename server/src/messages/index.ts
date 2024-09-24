import { serverConfig } from '~/config/server'
import { Languages } from '~/enums/langs'
import { EnglishMessages } from '~/messages/en'
import { PortugueseMessages } from '~/messages/pt'

const lang = serverConfig.defaultLang

export const Messages =
  lang === Languages.PT ? PortugueseMessages : EnglishMessages
