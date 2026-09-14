export interface IUser {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  image: string | null;
  is_admin: boolean;
  client_id: number;
}

export interface ILoginRequest {
  email: string;
  password: string;
}

export interface ILoginResponse {
  access: string;
  refresh: string;
  user: IUser;
}

export interface IApiErrorResponse {
  detail?: string;
  message?: string;
  non_field_errors?: string[];
  [key: string]: any;
}
