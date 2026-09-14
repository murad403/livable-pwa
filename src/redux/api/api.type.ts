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

export interface IUpdateProfileRequest {
  first_name?: string;
  last_name?: string;
  image?: File | string | null;
}

export interface ITrip {
  id: number;
  tour_id: number;
  client_id: number;
  client_name: string;
  email: string;
  visa: string;
  city: string;
  timeline: string;
  guide_name: string;
  property_views: number;
  created_at: string;
  updated_at: string;
}

export interface ITripsResponse {
  total: number;
  trips: ITrip[];
}
