import { createAction, props } from '@ngrx/store';
import { Notification } from './ui.state';

/**
 * Actions UI pour gérer l'interface utilisateur
 */

// Loading actions
export const showLoading = createAction('[UI] Show Loading');

export const hideLoading = createAction('[UI] Hide Loading');

// Error actions
export const showError = createAction('[UI] Show Error', props<{ error: string }>());

export const clearError = createAction('[UI] Clear Error');

// Notification actions
export const showNotification = createAction(
  '[UI] Show Notification',
  props<{ notification: Omit<Notification, 'id' | 'timestamp'> }>()
);

export const removeNotification = createAction(
  '[UI] Remove Notification',
  props<{ id: string }>()
);

export const clearAllNotifications = createAction('[UI] Clear All Notifications');

// Sidebar actions
export const toggleSidebar = createAction('[UI] Toggle Sidebar');

export const openSidebar = createAction('[UI] Open Sidebar');

export const closeSidebar = createAction('[UI] Close Sidebar');

// Theme actions
export const setTheme = createAction(
  '[UI] Set Theme',
  props<{ theme: 'light' | 'dark' | 'luxury' }>()
);

export const toggleTheme = createAction('[UI] Toggle Theme');
