export const PortugueseMessages = {
  EMPTY_FIELD: (field: string) => `${field} deve ser preenchido`,
  REQUIRED_FIELD: (field: string) => `${field} é obrigatório`,
  REQUIRED_MIN_LENGTH: (field: string, len: number) =>
    `${field} deve conter ${len} caractéres`,
  SERVER_DEFAULT_ERROR: 'Ops! Ocorreu um erro, por favor tente novamente!',
  MUST_BE_AN_UUID: (field: string) => `${field} deve ser um UUID`,
  MUST_BE_AN_EMAIL: (field: string) => `${field} deve ser um e-mail válido`,
  EMAIL_OR_PASSWORD_IS_INVALID:
    'Email ou senha inválidos, por favor tente novamente!',
  PASSWORD_BASIC_REQUIREMENTS: (field: string) =>
    `${field} deve seguir os requisitos mínimos`,
  PASSWORDS_FIELD_MUST_BE_THE_SAME: 'Os campos de senha devem ser iguais',
  EMAIL_IS_ALREADY_IN_REGISTERED: 'Esse email já está sendo utilizado',
  DOCUMENT_IS_ALREADY_IN_REGISTERED: 'Esse documento já está sendo utilizado',
  DOES_NOT_FOUND_USER: 'Não foi encontrado usuário com esse ID',
  DOES_NOT_FOUND_CHAT: 'Não foi encontrado chat com esse ID',
  UNAUTHORIZED: 'Você não é autorizado para realizar essa requisição',
  UNAUTHORIZED_TOKEN: 'Token inválido, por favor tente novamente',
  CHANGE_PASSWORD_ERROR:
    'Para alterar a senha, você precisa utilizar uma diferente da atual',
  CHANGE_PASSWORD_MUST_KNOW_OLD:
    'Para alterar sua senha, você precisa saber sua antiga',
  ADMIN_GET_SESSION_WITHOUT_PASSWORD:
    'Para acessar sua conta, você precisa digitar a senha correta',
  FIELDS_VALIDATION_ERROR: 'Erro de validação dos campos',
  PASSWORD_MISS_MATCH: 'Senhas não são iguais',
  CHAT_ALREADY_EXISTS: 'Você já possui uma conversa com esse contato',
  ERROR_READ_MESSAGES:
    'Para alterar os status das mensagens você precisa ser membro desse chat',
}
