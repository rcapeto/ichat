type DataKey<Data> = keyof Data

export function omit<Data>(object: Data, keys: Array<DataKey<Data>>): Data {
  if (typeof object !== 'object') {
    throw new Error('[Omit]: First param must be an object')
  }

  const response = {} as Data

  Object.keys(object).forEach((key) => {
    const formattedKey = key as DataKey<Data>

    if (!keys.includes(formattedKey)) {
      response[formattedKey] = object[formattedKey]
    }
  })

  return response
}
