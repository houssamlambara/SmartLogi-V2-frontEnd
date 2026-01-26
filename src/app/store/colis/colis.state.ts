import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';

/**
 * Interface Colis basée sur les modèles existants
 */
export interface Colis {
  id: string;
  trackingNumber: string;
  description: string;
  weight: number;
  dimensions?: {
    length: number;
    width: number;
    height: number;
  };
  status: string;
  senderName?: string;
  receiverName?: string;
  senderCity?: string;
  receiverCity?: string;
  createdAt?: string;
  updatedAt?: string;
  deliveryDate?: string;
  price?: number;
}

/**
 * Interface pour les filtres de colis
 */
export interface ColisFilters {
  status: string | null;
  dateFrom: string | null;
  dateTo: string | null;
  searchTerm: string | null;
  senderCity: string | null;
  receiverCity: string | null;
}

/**
 * Interface pour la pagination
 */
export interface ColisPagination {
  currentPage: number;
  pageSize: number;
  totalItems: number;
  totalPages: number;
}

/**
 * État des colis avec EntityState pour une gestion optimisée
 */
export interface ColisState extends EntityState<Colis> {
  selectedColisId: string | null;
  loading: boolean;
  error: string | null;
  filters: ColisFilters;
  pagination: ColisPagination;
}

/**
 * Adapter pour gérer la collection d'entités
 */
export const colisAdapter: EntityAdapter<Colis> = createEntityAdapter<Colis>({
  selectId: (colis: Colis) => colis.id,
  sortComparer: false, // Pas de tri par défaut
});

/**
 * État initial
 */
export const initialColisState: ColisState = colisAdapter.getInitialState({
  selectedColisId: null,
  loading: false,
  error: null,
  filters: {
    status: null,
    dateFrom: null,
    dateTo: null,
    searchTerm: null,
    senderCity: null,
    receiverCity: null,
  },
  pagination: {
    currentPage: 1,
    pageSize: 10,
    totalItems: 0,
    totalPages: 0,
  },
});
