export interface IUserModel {
  id: number;
  name: string;
  username: string;
  phone: string;
  document: string;
  email: string;
  password: string;
  role: string;
}

export interface IAuthenticateUserModel {
  user_credential: string;
  password: string;
}

export interface IAddUserModel {
  name: string;
  username: string;
  phone: string;
  document: string;
  email: string;
  password: string;
  password_confirmation: string;
}

export interface IUserTokenModel extends IUserModel {
  token: string;
}
