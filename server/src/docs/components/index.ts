import { createApiSchema } from '~/docs/utils/createApiSchema'

export const APIErrorSchema = createApiSchema({
  type: 'object',
  properties: {
    message: {
      type: 'string',
    },
    errorType: {
      type: 'string',
    },
    status: {
      type: 'number',
    },
  },
})
