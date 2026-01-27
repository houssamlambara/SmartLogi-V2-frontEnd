import { AuthState } from './auth/auth.state';
import { ColisState } from './colis/colis.state';

export interface AppState {
  auth: AuthState;
  colis: ColisState;
}
