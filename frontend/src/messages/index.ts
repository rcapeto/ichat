export const Messages = {
  REQUIRED_AUTHORIZATION:
    "Você precisa estar logado na aplicação para utiliza-la",
  NETWORK_DISCONNECT_DESCRIPTION:
    "Sua conexão está com problemas? Não estamos conseguindo acessa-la :(",
  NETWORK_DISCONNECT_TITLE: "Sem conexão à internet",
  MUST_BE_AN_UUID: (field: string) =>
    `O campo ${field} deve ser no formato UUID`,
  EMPTY_FIELD: (field: string) => `O campo ${field} não pode ser vazio`,
  REQUIRED_FIELD: (field: string) => `O campo ${field} é obrigatório`,
  MUST_BE_AN_EMAIL: (field: string) =>
    `O campo ${field} deve ser um e-mail válido`,
  REQUIRED_MIN_LENGTH: (field: string, length: number) =>
    `O campo ${field} deve ter ao menos ${length} caracteres`,
  PASSWORD_BASIC_REQUIREMENTS: (field: string) =>
    `O campo ${field} deve conter os requisitos mínimos para senha`,
  PASSWORD_MISS_MATCH: "Senhas não são iguais",
};
