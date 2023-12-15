export interface ILogin {
  username: '';
  password: '';
}

export interface IAuthCredentials {
  access_token: string;
  token_type: string;
  expires_in: number;
  refresh_token: string;
  '.issued': string;
  '.expires': string;
}
