export interface ILogin {
  username: '';
  password: '';
}

export interface IAuthCredentials {
  accessToken: string;
  refreshToken: string;
  expiresHours: number;
}
