import { createAction, props } from '@ngrx/store';
import { User } from './auth.state';

export const login = createAction(
  '[Auth Page] Login',
  props<{ email: string; password: string }>()
);

export const loginSuccess = createAction(
  '[Auth API] Login Success',
  props<{ user: User; token: string }>()
);

export const loginFailure = createAction(
  '[Auth API] Login Failure',
  props<{ error: string }>()
);

export const logout = createAction('[Auth] Logout');

export const logoutSuccess = createAction('[Auth API] Logout Success');

export const logoutFailure = createAction(
  '[Auth API] Logout Failure',
  props<{ error: string }>()
);

export const loadUserProfile = createAction('[Auth] Load User Profile');

export const loadUserProfileSuccess = createAction(
  '[Auth API] Load User Profile Success',
  props<{ user: User }>()
);

export const loadUserProfileFailure = createAction(
  '[Auth API] Load User Profile Failure',
  props<{ error: string }>()
);

export const checkAuth = createAction('[Auth] Check Authentication');

export const checkAuthSuccess = createAction(
  '[Auth] Check Authentication Success',
  props<{ user: User; token: string }>()
);

export const checkAuthFailure = createAction('[Auth] Check Authentication Failure');

export const refreshToken = createAction('[Auth] Refresh Token');

export const refreshTokenSuccess = createAction(
  '[Auth API] Refresh Token Success',
  props<{ token: string }>()
);

export const refreshTokenFailure = createAction(
  '[Auth API] Refresh Token Failure',
  props<{ error: string }>()
);

export const oauth2Login = createAction(
  '[Auth] OAuth2 Login',
  props<{ provider: string }>()
);

export const oauth2Callback = createAction(
  '[Auth] OAuth2 Callback',
  props<{ code: string }>()
);

export const oauth2Success = createAction(
  '[Auth API] OAuth2 Success',
  props<{ user: User; token: string }>()
);

export const oauth2Failure = createAction(
  '[Auth API] OAuth2 Failure',
  props<{ error: string }>()
);

export const clearAuthError = createAction('[Auth] Clear Error');
