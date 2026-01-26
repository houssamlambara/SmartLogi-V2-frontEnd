import { createFeatureSelector, createSelector } from '@ngrx/store';
import { LivreursState, livreursAdapter } from './livreurs.state';

export const selectLivreursState = createFeatureSelector<LivreursState>('livreurs');

const { selectAll, selectEntities } = livreursAdapter.getSelectors();

export const selectAllLivreurs = createSelector(selectLivreursState, selectAll);

export const selectLivreursEntities = createSelector(selectLivreursState, selectEntities);

export const selectLivreursLoading = createSelector(
  selectLivreursState,
  (state) => state.loading
);

export const selectLivreursError = createSelector(selectLivreursState, (state) => state.error);
