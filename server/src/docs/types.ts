import { SwaggerComponent } from '~/docs/components/types'

export type DocumentSchema = Record<string, SwaggerComponent>

export enum ApiSchemas {
  ERROR = 'APIErrorSchema',
}
