import { AuthState } from './auth/auth.state';
import { ColisState } from './colis/colis.state';
import { LivreursState } from './livreurs/livreurs.state';
import { SendersState } from './senders/senders.state';
import { ReceiversState } from './receivers/receivers.state';
import { UIState } from './ui/ui.state';

export interface AppState {
  auth: AuthState;
  colis: ColisState;
  livreurs: LivreursState;
  senders: SendersState;
  receivers: ReceiversState;
  ui: UIState;
}
