import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AuthState } from './auth.state';

/**
 * Selectors pour l'état d'authentification
 * Les selectors permettent d'accéder à des parties spécifiques du state de manière mémorisée
 */

// Feature selector
export const selectAuthState = createFeatureSelector<AuthState>('auth');

// Selectors simples
export const selectUser = createSelector(
  selectAuthState,
  (state: AuthState) => state.user
);

export const selectToken = createSelector(
  selectAuthState,
  (state: AuthState) => state.token
);

export const selectIsAuthenticated = createSelector(
  selectAuthState,
  (state: AuthState) => state.isAuthenticated
);

export const selectAuthLoading = createSelector(
  selectAuthState,
  (state: AuthState) => state.loading
);

export const selectAuthError = createSelector(
  selectAuthState,
  (state: AuthState) => state.error
);

export const selectUserRoles = createSelector(
  selectAuthState,
  (state: AuthState) => state.roles
);

// Selectors composés
export const selectUserFullName = createSelector(selectUser, (user) => {
  if (!user) return null;
  return `${user.firstName} ${user.lastName}`;
});

export const selectUserEmail = createSelector(selectUser, (user) => {
  if (!user) return null;
  return user.email;
});

export const selectUserId = createSelector(selectUser, (user) => {
  if (!user) return null;
  return user.id;
});

export const selectHasRole = (role: string) =>
  createSelector(selectUserRoles, (roles) => {
    return roles.includes(role);
  });

export const selectHasAnyRole = (requiredRoles: string[]) =>
  createSelector(selectUserRoles, (roles) => {
    return requiredRoles.some((role) => roles.includes(role));
  });

export const selectHasAllRoles = (requiredRoles: string[]) =>
  createSelector(selectUserRoles, (roles) => {
    return requiredRoles.every((role) => roles.includes(role));
  });

export const selectIsClient = createSelector(selectUserRoles, (roles) => {
  return roles.includes('CLIENT');
});

export const selectIsGestionnaire = createSelector(selectUserRoles, (roles) => {
  return roles.includes('GESTIONNAIRE');
});

export const selectIsLivreur = createSelector(selectUserRoles, (roles) => {
  return roles.includes('LIVREUR');
});

export const selectIsReceiver = createSelector(selectUserRoles, (roles) => {
  return roles.includes('Receiver');
});
