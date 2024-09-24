export function unmask(value: string, regex = /\D/g) {
  return value.replace(regex, '')
}
