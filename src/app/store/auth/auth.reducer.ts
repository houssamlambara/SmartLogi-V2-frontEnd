import { createReducer, on } from '@ngrx/store';
import { AuthState, initialAuthState } from './auth.state';
import * as AuthActions from './auth.actions';

/**
 * Reducer pour gérer l'état d'authentification
 */
export const authReducer = createReducer(
  initialAuthState,

  // Login
  on(AuthActions.login, (state): AuthState => ({
    ...state,
    loading: true,
    error: null,
  })),

  on(AuthActions.loginSuccess, (state, { user, token }): AuthState => ({
    ...state,
    user,
    token,
    isAuthenticated: true,
    roles: user.roles,
    loading: false,
    error: null,
  })),

  on(AuthActions.loginFailure, (state, { error }): AuthState => ({
    ...state,
    loading: false,
    error,
    isAuthenticated: false,
  })),

  // Logout
  on(AuthActions.logout, (state): AuthState => ({
    ...state,
    loading: true,
  })),

  on(AuthActions.logoutSuccess, (): AuthState => ({
    ...initialAuthState,
  })),

  on(AuthActions.logoutFailure, (state, { error }): AuthState => ({
    ...state,
    loading: false,
    error,
  })),

  // Load user profile
  on(AuthActions.loadUserProfile, (state): AuthState => ({
    ...state,
    loading: true,
    error: null,
  })),

  on(AuthActions.loadUserProfileSuccess, (state, { user }): AuthState => ({
    ...state,
    user,
    loading: false,
    error: null,
  })),

  on(AuthActions.loadUserProfileFailure, (state, { error }): AuthState => ({
    ...state,
    loading: false,
    error,
  })),

  // Check auth
  on(AuthActions.checkAuth, (state): AuthState => ({
    ...state,
    loading: true,
  })),

  on(AuthActions.checkAuthSuccess, (state, { user, token }): AuthState => ({
    ...state,
    user,
    token,
    isAuthenticated: true,
    roles: user.roles,
    loading: false,
    error: null,
  })),

  on(AuthActions.checkAuthFailure, (state): AuthState => ({
    ...initialAuthState,
    loading: false,
  })),

  // Refresh token
  on(AuthActions.refreshToken, (state): AuthState => ({
    ...state,
    loading: true,
  })),

  on(AuthActions.refreshTokenSuccess, (state, { token }): AuthState => ({
    ...state,
    token,
    loading: false,
    error: null,
  })),

  on(AuthActions.refreshTokenFailure, (state, { error }): AuthState => ({
    ...state,
    loading: false,
    error,
  })),

  // OAuth2
  on(AuthActions.oauth2Login, (state): AuthState => ({
    ...state,
    loading: true,
    error: null,
  })),

  on(AuthActions.oauth2Success, (state, { user, token }): AuthState => ({
    ...state,
    user,
    token,
    isAuthenticated: true,
    roles: user.roles,
    loading: false,
    error: null,
  })),

  on(AuthActions.oauth2Failure, (state, { error }): AuthState => ({
    ...state,
    loading: false,
    error,
    isAuthenticated: false,
  })),

  // Clear error
  on(AuthActions.clearAuthError, (state): AuthState => ({
    ...state,
    error: null,
  }))
);
