import { createAction, props } from '@ngrx/store';
import { Sender } from './senders.state';

export const loadSenders = createAction('[Senders] Load Senders');

export const loadSendersSuccess = createAction(
  '[Senders API] Load Senders Success',
  props<{ senders: Sender[] }>()
);

export const loadSendersFailure = createAction(
  '[Senders API] Load Senders Failure',
  props<{ error: string }>()
);

export const selectSender = createAction('[Senders] Select Sender', props<{ id: string }>());
