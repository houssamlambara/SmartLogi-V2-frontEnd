import { ActionReducerMap, MetaReducer } from '@ngrx/store';
import { isDevMode } from '@angular/core';
import { AppState } from './app.state';
import { authReducer } from './auth/auth.reducer';
import { colisReducer } from './colis/colis.reducer';

export const reducers: ActionReducerMap<AppState> = {
  auth: authReducer,
  colis: colisReducer,
};

export const metaReducers: MetaReducer<AppState>[] = isDevMode() ? [] : [];

export { AuthEffects } from './auth/auth.effects';
export { ColisEffects } from './colis/colis.effects';
