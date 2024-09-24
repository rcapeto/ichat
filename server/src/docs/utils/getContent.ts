export function getJsonRef(path: string) {
  return `#/components/schemas/${path}`
}

export function getContent(path: string, example: Record<string, unknown>) {
  return {
    'application/json': {
      schema: {
        $ref: getJsonRef(path),
      },
      example,
    },
  }
}
