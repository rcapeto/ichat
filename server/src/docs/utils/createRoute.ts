import { Status } from '~/enums/status'
import { SwaggerComponentType } from '~/docs/components/types'
import { getContent } from './getContent'
import { ApiResponseInterface } from '~/entities/apiResponse'

type Method = 'delete' | 'post' | 'get' | 'put' | 'delete' | 'patch'

type Tags = string[]

type Param = {
  in: string
  name: string
  schema: {
    type: SwaggerComponentType
  }
  required: boolean
  description: string
}

type RequestBody<Type> = {
  schema: string
  example: Type
}

type Response<Type> = {
  code: Status
  description: string
  contentSchemaPath: string
  content: Partial<ApiResponseInterface<Type>>
}

type Route<RequestBodyType, ResponseType> = {
  method: Method
  summary: string
  tags: Tags
  description: string
  parameters?: Param[]
  responses?: Response<ResponseType>[]
  requestBody?: RequestBody<RequestBodyType>
  isPrivated?: boolean
}

export type CreateRouteParams<Body, Response> = {
  routes: Route<Body, Response>[]
}

export function createRoute<Body, Response>({
  routes,
}: CreateRouteParams<Body, Response>) {
  const correctRoute: any = {}

  routes.forEach((route) => {
    const requestBody = route.requestBody
      ? {
          content: getContent(
            route.requestBody.schema,
            route.requestBody.example as Record<string, unknown>,
          ),
        }
      : undefined

    const responses: any = {}
    const routeResponses = route.responses ?? []

    routeResponses.forEach((response) => {
      responses[response.code] = {
        description: response.description,
        content: getContent(
          response.contentSchemaPath,
          response.content as Record<string, unknown>,
        ),
      }
    })

    correctRoute[route.method] = Object.assign(
      {
        tags: route.tags,
        summary: route.summary,
        description: route.description,
        requestBody,
        responses,
        parameters: route.parameters,
      },
      route.isPrivated ? { security: [{ bearerAuth: [] }] } : {},
    )
  })

  return correctRoute
}

// parâmetros no path
// parameters: [
//   {
//     description: 'Specific user id',
//     in: 'path',
//     name: 'id',
//     required: true,
//     schema: { type: 'string' },
//   },
// ],
// parâmetros no query
// {
//   description: 'Current page',
//   in: 'query',
//   name: 'page',
//   required: false,
//   schema: {
//     type: 'string',
//   },
// },
