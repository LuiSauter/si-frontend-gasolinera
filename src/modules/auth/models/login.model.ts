// export interface ApiUserLogin {
//   statusCode: number
//   data: {
//     accessToken: string
//     User: ApiUser
//   }
// }

// export interface ApiUserValidateToken {
//   statusCode: number
//   data: ApiUser
// }

interface AuthLoginBase {
  password: string
}

export interface AuthLogin extends AuthLoginBase {
  email: string
}

export interface AuthLoginWithToken extends AuthLoginBase {
  passwordConfirm: string
  token: string
}

export const AuthLoginEmpty: AuthLogin = {
  email: '',
  password: ''
}

interface IAuthLoginElements extends HTMLFormControlsCollection {
  email: HTMLInputElement
  password: HTMLInputElement
  passwordConfirm: string
}

export interface IAuthLoginCustomForm extends HTMLFormElement {
  readonly elements: IAuthLoginElements
}
