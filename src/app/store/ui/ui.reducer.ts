import { createReducer, on } from '@ngrx/store';
import { UIState, initialUIState, Notification } from './ui.state';
import * as UIActions from './ui.actions';

/**
 * Reducer pour gérer l'état de l'interface utilisateur
 */
export const uiReducer = createReducer(
  initialUIState,

  // Loading
  on(UIActions.showLoading, (state): UIState => ({
    ...state,
    loading: true,
  })),

  on(UIActions.hideLoading, (state): UIState => ({
    ...state,
    loading: false,
  })),

  // Error
  on(UIActions.showError, (state, { error }): UIState => ({
    ...state,
    globalError: error,
  })),

  on(UIActions.clearError, (state): UIState => ({
    ...state,
    globalError: null,
  })),

  // Notifications
  on(UIActions.showNotification, (state, { notification }): UIState => {
    const newNotification: Notification = {
      ...notification,
      id: `${Date.now()}-${Math.random()}`,
      timestamp: Date.now(),
      duration: notification.duration || 5000,
    };

    return {
      ...state,
      notifications: [...state.notifications, newNotification],
    };
  }),

  on(UIActions.removeNotification, (state, { id }): UIState => ({
    ...state,
    notifications: state.notifications.filter((n) => n.id !== id),
  })),

  on(UIActions.clearAllNotifications, (state): UIState => ({
    ...state,
    notifications: [],
  })),

  // Sidebar
  on(UIActions.toggleSidebar, (state): UIState => ({
    ...state,
    sidebarOpen: !state.sidebarOpen,
  })),

  on(UIActions.openSidebar, (state): UIState => ({
    ...state,
    sidebarOpen: true,
  })),

  on(UIActions.closeSidebar, (state): UIState => ({
    ...state,
    sidebarOpen: false,
  })),

  // Theme
  on(UIActions.setTheme, (state, { theme }): UIState => ({
    ...state,
    theme,
  })),

  on(UIActions.toggleTheme, (state): UIState => {
    const themes: Array<'light' | 'dark' | 'luxury'> = ['light', 'dark', 'luxury'];
    const currentIndex = themes.indexOf(state.theme);
    const nextIndex = (currentIndex + 1) % themes.length;

    return {
      ...state,
      theme: themes[nextIndex],
    };
  })
);
