import { createAction, props } from '@ngrx/store';
import { Receiver } from './receivers.state';

export const loadReceivers = createAction('[Receivers] Load Receivers');

export const loadReceiversSuccess = createAction(
  '[Receivers API] Load Receivers Success',
  props<{ receivers: Receiver[] }>()
);

export const loadReceiversFailure = createAction(
  '[Receivers API] Load Receivers Failure',
  props<{ error: string }>()
);

export const selectReceiver = createAction(
  '[Receivers] Select Receiver',
  props<{ id: string }>()
);
