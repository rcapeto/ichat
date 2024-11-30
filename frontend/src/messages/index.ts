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
  INVALID_FILE_TYPE: "O formato do arquivo escolhido não é suportado",
  INVALID_FORMAT: "Formato inválido",
  EMAIL_OR_PASSWORD_IS_INVALID:
    "Email ou senha inválidos, por favor tente novamente!",
  ERROR_TITLE: "Oh! Ops...",
  DEFAULT_ERROR_MESSAGE: "Algo de errado aconteceu, tente novamente!",
  WELCOME: "Seja bem-vindo!",
  CREATE_CHAT_ERROR:
    "Houve um problema para criar um chat com esse usuário, por favor tente novamente",
  CREATE_MESSAGE:
    "Ocorreu um problema ao enviar mensagem, por favor tente novamente",
  NEW_MESSAGE: (fullName: string) => `${fullName} lhe enviou uma nova mensagem`,
};
