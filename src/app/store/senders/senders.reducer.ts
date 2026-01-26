import { createReducer, on } from '@ngrx/store';
import { SendersState, initialSendersState, sendersAdapter } from './senders.state';
import * as SendersActions from './senders.actions';

export const sendersReducer = createReducer(
  initialSendersState,

  on(SendersActions.loadSenders, (state): SendersState => ({
    ...state,
    loading: true,
    error: null,
  })),

  on(SendersActions.loadSendersSuccess, (state, { senders }): SendersState =>
    sendersAdapter.setAll(senders, {
      ...state,
      loading: false,
      error: null,
    })
  ),

  on(SendersActions.loadSendersFailure, (state, { error }): SendersState => ({
    ...state,
    loading: false,
    error,
  })),

  on(SendersActions.selectSender, (state, { id }): SendersState => ({
    ...state,
    selectedSenderId: id,
  }))
);
