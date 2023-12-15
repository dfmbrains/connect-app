export interface ILogin {
  username: string;
  password: string;
}

export interface ISignUp {
  username: string;
  password: string;
  firstName: string;
  lastName: string;
}

export interface IAuthCredentials {
  accessToken: string;
  refreshToken: string;
  expiresHours: number;
}
