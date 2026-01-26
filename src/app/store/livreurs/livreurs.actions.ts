import { createAction, props } from '@ngrx/store';
import { Livreur } from './livreurs.state';

export const loadLivreurs = createAction('[Livreurs] Load Livreurs');

export const loadLivreursSuccess = createAction(
  '[Livreurs API] Load Livreurs Success',
  props<{ livreurs: Livreur[] }>()
);

export const loadLivreursFailure = createAction(
  '[Livreurs API] Load Livreurs Failure',
  props<{ error: string }>()
);

export const selectLivreur = createAction(
  '[Livreurs] Select Livreur',
  props<{ id: string }>()
);
