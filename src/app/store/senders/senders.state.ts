import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';

export interface Sender {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  address?: string;
  city?: string;
  postalCode?: string;
}

export interface SendersState extends EntityState<Sender> {
  selectedSenderId: string | null;
  loading: boolean;
  error: string | null;
}

export const sendersAdapter: EntityAdapter<Sender> = createEntityAdapter<Sender>({
  selectId: (sender: Sender) => sender.id,
});

export const initialSendersState: SendersState = sendersAdapter.getInitialState({
  selectedSenderId: null,
  loading: false,
  error: null,
});
