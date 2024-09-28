export const EnglishMessages = {
  EMPTY_FIELD: (field: string) => `${field} must be filled`,
  REQUIRED_FIELD: (field: string) => `${field} is required`,
  REQUIRED_MIN_LENGTH: (field: string, len: number) =>
    `${field} must have ${len} chars`,
  SERVER_DEFAULT_ERROR: 'An error has occurred, please try again',
  MUST_BE_AN_UUID: (field: string) => `${field} must be an UUID`,
  MUST_BE_AN_EMAIL: (field: string) => `${field} must be a valid e-mail`,
  EMAIL_OR_PASSWORD_IS_INVALID:
    'Email or password is invalid, please try again!',
  PASSWORD_BASIC_REQUIREMENTS: (field: string) =>
    `${field} needs basic requirements`,
  PASSWORDS_FIELD_MUST_BE_THE_SAME: 'The password fields must be the same',
  EMAIL_IS_ALREADY_IN_REGISTERED: 'This email is already registered',
  DOCUMENT_IS_ALREADY_IN_REGISTERED: 'This email is already registered',
  DOES_NOT_FOUND_USER: 'Does not found user with this ID',
  UNAUTHORIZED: 'You are not authorized to do this request',
  UNAUTHORIZED_TOKEN: 'Invalid token, please try again',
  CHANGE_PASSWORD_ERROR:
    'To change a password you need to use a different than now',
  CHANGE_PASSWORD_MUST_KNOW_OLD:
    'To change your password you need to know your old password',
  YOU_ARE_UNAUTHORIZED_DELETE_USER:
    'You can not delete an user, please check your authorization',
  ADMIN_GET_SESSION_WITHOUT_PASSWORD:
    'To sign in you need the correct password',
  FIELDS_VALIDATION_ERROR: 'Field validation error',
  PASSWORD_MISS_MATCH: 'Passwords must be the same',
  CHAT_ALREADY_EXISTS: 'You have a chat with this contact',
}
