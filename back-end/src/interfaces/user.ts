export interface IUserRequest {
  name: string;
  email: string;
  date_birth: string;
  password: string;
  avatar: string;
  isActive: boolean;
}

export interface IUserCreate {
  id: string;
  name: string;
  email: string;
  date_birth: string;
  avatar: string;
  isActive?: boolean;
}

export interface IUserLogin {
  email: string;
  password: string;
}

export interface IUserUpdate {
  name: string;
  email: string;
  date_birth: string;
  avatar: string;
  password: string;
  isActive: boolean;
}

export interface IUserResponse {
  id: string;
}
