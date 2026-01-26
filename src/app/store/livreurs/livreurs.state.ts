import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';

export interface Livreur {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  vehicleType?: string;
  status: 'AVAILABLE' | 'BUSY' | 'OFFLINE';
  currentLocation?: {
    latitude: number;
    longitude: number;
  };
}

export interface LivreursState extends EntityState<Livreur> {
  selectedLivreurId: string | null;
  loading: boolean;
  error: string | null;
}

export const livreursAdapter: EntityAdapter<Livreur> = createEntityAdapter<Livreur>({
  selectId: (livreur: Livreur) => livreur.id,
});

export const initialLivreursState: LivreursState = livreursAdapter.getInitialState({
  selectedLivreurId: null,
  loading: false,
  error: null,
});
