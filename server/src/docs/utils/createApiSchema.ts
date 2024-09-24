import { SwaggerComponent } from '~/docs/components/types'

export function createApiSchema(component: SwaggerComponent): SwaggerComponent {
  return {
    type: 'object',
    properties: {
      ok: { type: 'boolean' },
      data: component,
    },
  }
}
