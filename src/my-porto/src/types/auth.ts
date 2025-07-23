export interface UserType {
  id: number;
  name: string;
  email: string;
  email_verified_at: string | null;
  created_at: string;
  updated_at: string;
  phone?: string;
  role: "user" | "admin";
  avatar?: string;
  image?: FileList;
}

export interface LoginType {
  email: string;
  password: string;
  remember: boolean;
}

export interface RegisterType {
  name: string;
  email: string;
  password: string;
  remember: boolean;
  password_confirmation: string;
}

export interface AuthProps {
  middleware?: "guest" | "auth";
  redirectIfAuthenticated?: string;
}

export interface LoginResponse {
  user: UserType;
  token: string;
}

export interface ResponseTypeAuth {
  success: boolean;
  message: string;
  data: LoginResponse;
}
