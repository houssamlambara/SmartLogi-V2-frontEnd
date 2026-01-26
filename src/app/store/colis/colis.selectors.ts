import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ColisState, colisAdapter } from './colis.state';

/**
 * Selectors pour l'état des colis
 */

// Feature selector
export const selectColisState = createFeatureSelector<ColisState>('colis');

// Entity selectors
const { selectIds, selectEntities, selectAll, selectTotal } = colisAdapter.getSelectors();

// Selectors de base
export const selectAllColis = createSelector(selectColisState, selectAll);

export const selectColisEntities = createSelector(selectColisState, selectEntities);

export const selectColisIds = createSelector(selectColisState, selectIds);

export const selectColisTotal = createSelector(selectColisState, selectTotal);

export const selectColisLoading = createSelector(
  selectColisState,
  (state: ColisState) => state.loading
);

export const selectColisError = createSelector(
  selectColisState,
  (state: ColisState) => state.error
);

export const selectSelectedColisId = createSelector(
  selectColisState,
  (state: ColisState) => state.selectedColisId
);

export const selectSelectedColis = createSelector(
  selectColisEntities,
  selectSelectedColisId,
  (entities, selectedId) => (selectedId ? entities[selectedId] : null)
);

export const selectColisById = (id: string) =>
  createSelector(selectColisEntities, (entities) => entities[id]);

// Filters selectors
export const selectColisFilters = createSelector(
  selectColisState,
  (state: ColisState) => state.filters
);

export const selectColisStatusFilter = createSelector(
  selectColisFilters,
  (filters) => filters.status
);

export const selectColisSearchTerm = createSelector(
  selectColisFilters,
  (filters) => filters.searchTerm
);

// Pagination selectors
export const selectColisPagination = createSelector(
  selectColisState,
  (state: ColisState) => state.pagination
);

export const selectColisCurrentPage = createSelector(
  selectColisPagination,
  (pagination) => pagination.currentPage
);

export const selectColisPageSize = createSelector(
  selectColisPagination,
  (pagination) => pagination.pageSize
);

export const selectColisTotalItems = createSelector(
  selectColisPagination,
  (pagination) => pagination.totalItems
);

export const selectColisTotalPages = createSelector(
  selectColisPagination,
  (pagination) => pagination.totalPages
);

// Filtered colis selector
export const selectFilteredColis = createSelector(
  selectAllColis,
  selectColisFilters,
  (colis, filters) => {
    let filtered = [...colis];

    // Filter by status
    if (filters.status) {
      filtered = filtered.filter((c) => c.status === filters.status);
    }

    // Filter by search term
    if (filters.searchTerm) {
      const searchLower = filters.searchTerm.toLowerCase();
      filtered = filtered.filter(
        (c) =>
          c.trackingNumber?.toLowerCase().includes(searchLower) ||
          c.description?.toLowerCase().includes(searchLower) ||
          c.senderName?.toLowerCase().includes(searchLower) ||
          c.receiverName?.toLowerCase().includes(searchLower)
      );
    }

    // Filter by date range
    if (filters.dateFrom) {
      filtered = filtered.filter((c) => c.createdAt && c.createdAt >= filters.dateFrom!);
    }

    if (filters.dateTo) {
      filtered = filtered.filter((c) => c.createdAt && c.createdAt <= filters.dateTo!);
    }

    // Filter by sender city
    if (filters.senderCity) {
      filtered = filtered.filter((c) => c.senderCity === filters.senderCity);
    }

    // Filter by receiver city
    if (filters.receiverCity) {
      filtered = filtered.filter((c) => c.receiverCity === filters.receiverCity);
    }

    return filtered;
  }
);

// Paginated colis selector
export const selectPaginatedColis = createSelector(
  selectFilteredColis,
  selectColisPagination,
  (colis, pagination) => {
    const startIndex = (pagination.currentPage - 1) * pagination.pageSize;
    const endIndex = startIndex + pagination.pageSize;
    return colis.slice(startIndex, endIndex);
  }
);

// Has filters active selector
export const selectHasActiveFilters = createSelector(selectColisFilters, (filters) => {
  return !!(
    filters.status ||
    filters.searchTerm ||
    filters.dateFrom ||
    filters.dateTo ||
    filters.senderCity ||
    filters.receiverCity
  );
});

// Statistics selectors
export const selectColisStatsByStatus = createSelector(selectAllColis, (colis) => {
  return colis.reduce(
    (acc, c) => {
      acc[c.status] = (acc[c.status] || 0) + 1;
      return acc;
    },
    {} as Record<string, number>
  );
});

export const selectColisTotalWeight = createSelector(selectAllColis, (colis) => {
  return colis.reduce((total, c) => total + (c.weight || 0), 0);
});

export const selectColisTotalPrice = createSelector(selectAllColis, (colis) => {
  return colis.reduce((total, c) => total + (c.price || 0), 0);
});
