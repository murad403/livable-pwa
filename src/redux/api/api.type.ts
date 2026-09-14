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

export interface ITodayDetails {
  description?: string | null;
  host_name?: string | null;
  meeting_point?: string | null;
  what_to_bring?: string | null;
  google_maps_link?: string | null;
  restaurant_link?: string | null;
  phone?: string | null;
  website?: string | null;
  reminder?: string | null;
}

export interface ITodayItem {
  id: string;
  start_time: string;
  end_time?: string | null;
  title: string;
  type?: string;
  short_description?: string;
  is_expandable?: boolean;
  details?: ITodayDetails | null;
}

export interface ITodayResponse {
  client_name?: string;
  greeting?: string;
  subtitle?: string;
  day_number?: number;
  date?: string;
  items: ITodayItem[];
}

export interface ICityTestSummary {
  id: string;
  title: string;
  order?: number;
  is_completed?: boolean;
}

export interface ICityTestCategory {
  id: string;
  name: string;
  description: string;
  tests: ICityTestSummary[];
}

export interface IExternalLink {
  label: string;
  url: string;
}

export interface IPreviousSubmission {
  notes?: string | null;
  question_for_liv_team?: string | null;
  submitted_at?: string | null;
}

export interface ICityTestDetail {
  id: string;
  category_id: string;
  title: string;
  city?: string | null;
  short_description?: string | null;
  google_maps_link?: string | null;
  external_links?: IExternalLink[] | null;
  note_prompts?: string[] | null;
  question_prompts?: string[] | null;
  previous_submission?: IPreviousSubmission | null;
}

export interface ISaveCityTestRequest {
  test_id: string;
  notes: string;
  question_for_liv_team?: string;
}

export interface ISaveCityTestResponse {
  message?: string;
  status?: string;
  [key: string]: any;
}



