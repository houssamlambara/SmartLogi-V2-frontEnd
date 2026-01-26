import { ActionReducerMap, MetaReducer } from '@ngrx/store';
import { isDevMode } from '@angular/core';
import { AppState } from './app.state';
import { authReducer } from './auth/auth.reducer';
import { colisReducer } from './colis/colis.reducer';
import { livreursReducer } from './livreurs/livreurs.reducer';
import { sendersReducer } from './senders/senders.reducer';
import { receiversReducer } from './receivers/receivers.reducer';
import { uiReducer } from './ui/ui.reducer';

export const reducers: ActionReducerMap<AppState> = {
  auth: authReducer,
  colis: colisReducer,
  livreurs: livreursReducer,
  senders: sendersReducer,
  receivers: receiversReducer,
  ui: uiReducer,
};

export const metaReducers: MetaReducer<AppState>[] = isDevMode() ? [] : [];

export { AuthEffects } from './auth/auth.effects';
export { ColisEffects } from './colis/colis.effects';
export { LivreursEffects } from './livreurs/livreurs.effects';
export { SendersEffects } from './senders/senders.effects';
export { ReceiversEffects } from './receivers/receivers.effects';
