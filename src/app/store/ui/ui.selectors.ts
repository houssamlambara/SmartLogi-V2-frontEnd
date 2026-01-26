import { createFeatureSelector, createSelector } from '@ngrx/store';
import { UIState } from './ui.state';

/**
 * Selectors pour l'état de l'interface utilisateur
 */

// Feature selector
export const selectUIState = createFeatureSelector<UIState>('ui');

// Loading selector
export const selectLoading = createSelector(selectUIState, (state: UIState) => state.loading);

// Error selector
export const selectGlobalError = createSelector(
  selectUIState,
  (state: UIState) => state.globalError
);

export const selectHasError = createSelector(selectGlobalError, (error) => !!error);

// Notifications selectors
export const selectNotifications = createSelector(
  selectUIState,
  (state: UIState) => state.notifications
);

export const selectHasNotifications = createSelector(
  selectNotifications,
  (notifications) => notifications.length > 0
);

export const selectNotificationCount = createSelector(
  selectNotifications,
  (notifications) => notifications.length
);

export const selectLatestNotification = createSelector(selectNotifications, (notifications) => {
  if (notifications.length === 0) return null;
  return notifications[notifications.length - 1];
});

// Sidebar selectors
export const selectSidebarOpen = createSelector(
  selectUIState,
  (state: UIState) => state.sidebarOpen
);

// Theme selectors
export const selectTheme = createSelector(selectUIState, (state: UIState) => state.theme);

export const selectIsLightTheme = createSelector(selectTheme, (theme) => theme === 'light');

export const selectIsDarkTheme = createSelector(selectTheme, (theme) => theme === 'dark');

export const selectIsLuxuryTheme = createSelector(selectTheme, (theme) => theme === 'luxury');
