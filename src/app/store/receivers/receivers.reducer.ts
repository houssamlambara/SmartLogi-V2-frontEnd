import { createReducer, on } from '@ngrx/store';
import { ReceiversState, initialReceiversState, receiversAdapter } from './receivers.state';
import * as ReceiversActions from './receivers.actions';

export const receiversReducer = createReducer(
  initialReceiversState,

  on(ReceiversActions.loadReceivers, (state): ReceiversState => ({
    ...state,
    loading: true,
    error: null,
  })),

  on(ReceiversActions.loadReceiversSuccess, (state, { receivers }): ReceiversState =>
    receiversAdapter.setAll(receivers, {
      ...state,
      loading: false,
      error: null,
    })
  ),

  on(ReceiversActions.loadReceiversFailure, (state, { error }): ReceiversState => ({
    ...state,
    loading: false,
    error,
  })),

  on(ReceiversActions.selectReceiver, (state, { id }): ReceiversState => ({
    ...state,
    selectedReceiverId: id,
  }))
);
