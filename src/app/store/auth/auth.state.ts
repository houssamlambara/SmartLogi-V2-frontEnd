export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  roles: string[];
  phoneNumber?: string;
}

export interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
  roles: string[];
}

export const initialAuthState: AuthState = {
  user: null,
  token: null,
  isAuthenticated: false,
  loading: false,
  error: null,
  roles: [],
};
