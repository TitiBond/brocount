export interface AdminSession {
  email: string;
  role: 'ADMIN';
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface CsrfToken {
  token: string;
  headerName: string;
  parameterName: string;
}
