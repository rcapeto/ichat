export const applicationConfig = {
  localStorage: {
    registerEmail: "@register:user:email",
    theme: "@app:current-theme",
  },
  cookies: {
    userToken: "@token:user",
  },
  api: {
    headers: {
      authorization: "Authorization",
    },
    version: 'v1'
  },
};
