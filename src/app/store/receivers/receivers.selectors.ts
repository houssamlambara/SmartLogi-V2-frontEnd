import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ReceiversState, receiversAdapter } from './receivers.state';

export const selectReceiversState = createFeatureSelector<ReceiversState>('receivers');

const { selectAll, selectEntities } = receiversAdapter.getSelectors();

export const selectAllReceivers = createSelector(selectReceiversState, selectAll);

export const selectReceiversEntities = createSelector(selectReceiversState, selectEntities);

export const selectReceiversLoading = createSelector(
  selectReceiversState,
  (state) => state.loading
);

export const selectReceiversError = createSelector(selectReceiversState, (state) => state.error);
