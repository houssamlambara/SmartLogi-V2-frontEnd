import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';

export interface Receiver {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  address?: string;
  city?: string;
  postalCode?: string;
}

export interface ReceiversState extends EntityState<Receiver> {
  selectedReceiverId: string | null;
  loading: boolean;
  error: string | null;
}

export const receiversAdapter: EntityAdapter<Receiver> = createEntityAdapter<Receiver>({
  selectId: (receiver: Receiver) => receiver.id,
});

export const initialReceiversState: ReceiversState = receiversAdapter.getInitialState({
  selectedReceiverId: null,
  loading: false,
  error: null,
});
