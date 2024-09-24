export type SwaggerComponentType =
  | 'string'
  | 'object'
  | 'boolean'
  | 'number'
  | 'array'

type SwaggerComponentSimpleType = {
  type: 'string' | 'boolean' | 'number'
}

type SwaggerComponentArray = {
  type: 'array'
  items: SwaggerComponentObject
}

type SwaggerComponentObject = {
  type: 'object'
  properties: Record<
    string,
    SwaggerComponentSimpleType | SwaggerComponentObject | SwaggerComponentArray
  >
}

export type SwaggerComponent = SwaggerComponentObject | SwaggerComponentObject
