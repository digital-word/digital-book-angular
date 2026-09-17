export interface User {
  uid: string;
  email: string;

  stsTokenManager: {
    refreshToken: string;
    accessToken: string;
    expirationTime: number;
  };
}

export interface LoginParam {
  email: string;
  password: string;
}
