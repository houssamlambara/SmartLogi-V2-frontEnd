/**
 * Interface pour les notifications
 */
export interface Notification {
  id: string;
  type: 'success' | 'error' | 'info' | 'warning';
  message: string;
  duration?: number;
  timestamp: number;
}

/**
 * État de l'interface utilisateur
 */
export interface UIState {
  loading: boolean;
  globalError: string | null;
  notifications: Notification[];
  sidebarOpen: boolean;
  theme: 'light' | 'dark' | 'luxury';
}

export const initialUIState: UIState = {
  loading: false,
  globalError: null,
  notifications: [],
  sidebarOpen: true,
  theme: 'light',
};
