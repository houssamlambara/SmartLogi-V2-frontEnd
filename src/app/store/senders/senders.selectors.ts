import { createFeatureSelector, createSelector } from '@ngrx/store';
import { SendersState, sendersAdapter } from './senders.state';

export const selectSendersState = createFeatureSelector<SendersState>('senders');

const { selectAll, selectEntities } = sendersAdapter.getSelectors();

export const selectAllSenders = createSelector(selectSendersState, selectAll);

export const selectSendersEntities = createSelector(selectSendersState, selectEntities);

export const selectSendersLoading = createSelector(selectSendersState, (state) => state.loading);

export const selectSendersError = createSelector(selectSendersState, (state) => state.error);
