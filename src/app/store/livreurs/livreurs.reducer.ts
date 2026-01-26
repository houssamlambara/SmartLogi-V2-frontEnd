import { createReducer, on } from '@ngrx/store';
import { LivreursState, initialLivreursState, livreursAdapter } from './livreurs.state';
import * as LivreursActions from './livreurs.actions';

export const livreursReducer = createReducer(
  initialLivreursState,

  on(LivreursActions.loadLivreurs, (state): LivreursState => ({
    ...state,
    loading: true,
    error: null,
  })),

  on(LivreursActions.loadLivreursSuccess, (state, { livreurs }): LivreursState =>
    livreursAdapter.setAll(livreurs, {
      ...state,
      loading: false,
      error: null,
    })
  ),

  on(LivreursActions.loadLivreursFailure, (state, { error }): LivreursState => ({
    ...state,
    loading: false,
    error,
  })),

  on(LivreursActions.selectLivreur, (state, { id }): LivreursState => ({
    ...state,
    selectedLivreurId: id,
  }))
);
