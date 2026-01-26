import { createReducer, on } from '@ngrx/store';
import { ColisState, initialColisState, colisAdapter } from './colis.state';
import * as ColisActions from './colis.actions';

/**
 * Reducer pour gérer l'état des colis
 * Utilise EntityAdapter pour une gestion optimisée des collections
 */
export const colisReducer = createReducer(
  initialColisState,

  // Load colis list
  on(ColisActions.loadColis, (state): ColisState => ({
    ...state,
    loading: true,
    error: null,
  })),

  on(ColisActions.loadColisSuccess, (state, { colis, totalItems }): ColisState => {
    const totalPages = Math.ceil(totalItems / state.pagination.pageSize);
    return colisAdapter.setAll(colis, {
      ...state,
      loading: false,
      error: null,
      pagination: {
        ...state.pagination,
        totalItems,
        totalPages,
      },
    });
  }),

  on(ColisActions.loadColisFailure, (state, { error }): ColisState => ({
    ...state,
    loading: false,
    error,
  })),

  // Load single colis
  on(ColisActions.loadColisById, (state): ColisState => ({
    ...state,
    loading: true,
    error: null,
  })),

  on(ColisActions.loadColisByIdSuccess, (state, { colis }): ColisState =>
    colisAdapter.upsertOne(colis, {
      ...state,
      selectedColisId: colis.id,
      loading: false,
      error: null,
    })
  ),

  on(ColisActions.loadColisByIdFailure, (state, { error }): ColisState => ({
    ...state,
    loading: false,
    error,
  })),

  // Create colis
  on(ColisActions.createColis, (state): ColisState => ({
    ...state,
    loading: true,
    error: null,
  })),

  on(ColisActions.createColisSuccess, (state, { colis }): ColisState =>
    colisAdapter.addOne(colis, {
      ...state,
      loading: false,
      error: null,
      pagination: {
        ...state.pagination,
        totalItems: state.pagination.totalItems + 1,
      },
    })
  ),

  on(ColisActions.createColisFailure, (state, { error }): ColisState => ({
    ...state,
    loading: false,
    error,
  })),

  // Update colis
  on(ColisActions.updateColis, (state): ColisState => ({
    ...state,
    loading: true,
    error: null,
  })),

  on(ColisActions.updateColisSuccess, (state, { colis }): ColisState =>
    colisAdapter.updateOne(
      { id: colis.id, changes: colis },
      {
        ...state,
        loading: false,
        error: null,
      }
    )
  ),

  on(ColisActions.updateColisFailure, (state, { error }): ColisState => ({
    ...state,
    loading: false,
    error,
  })),

  // Delete colis
  on(ColisActions.deleteColis, (state): ColisState => ({
    ...state,
    loading: true,
    error: null,
  })),

  on(ColisActions.deleteColisSuccess, (state, { id }): ColisState =>
    colisAdapter.removeOne(id, {
      ...state,
      loading: false,
      error: null,
      selectedColisId: state.selectedColisId === id ? null : state.selectedColisId,
      pagination: {
        ...state.pagination,
        totalItems: state.pagination.totalItems - 1,
      },
    })
  ),

  on(ColisActions.deleteColisFailure, (state, { error }): ColisState => ({
    ...state,
    loading: false,
    error,
  })),

  // Select colis
  on(ColisActions.selectColis, (state, { id }): ColisState => ({
    ...state,
    selectedColisId: id,
  })),

  on(ColisActions.deselectColis, (state): ColisState => ({
    ...state,
    selectedColisId: null,
  })),

  // Filters
  on(ColisActions.setColisFilters, (state, { filters }): ColisState => ({
    ...state,
    filters: {
      ...state.filters,
      ...filters,
    },
    pagination: {
      ...state.pagination,
      currentPage: 1, // Reset to first page when filtering
    },
  })),

  on(ColisActions.clearColisFilters, (state): ColisState => ({
    ...state,
    filters: {
      status: null,
      dateFrom: null,
      dateTo: null,
      searchTerm: null,
      senderCity: null,
      receiverCity: null,
    },
    pagination: {
      ...state.pagination,
      currentPage: 1,
    },
  })),

  // Pagination
  on(ColisActions.setColisPage, (state, { page }): ColisState => ({
    ...state,
    pagination: {
      ...state.pagination,
      currentPage: page,
    },
  })),

  on(ColisActions.setColisPageSize, (state, { pageSize }): ColisState => ({
    ...state,
    pagination: {
      ...state.pagination,
      pageSize,
      currentPage: 1, // Reset to first page
      totalPages: Math.ceil(state.pagination.totalItems / pageSize),
    },
  })),

  // Search
  on(ColisActions.searchColis, (state, { searchTerm }): ColisState => ({
    ...state,
    filters: {
      ...state.filters,
      searchTerm,
    },
    pagination: {
      ...state.pagination,
      currentPage: 1,
    },
  })),

  // Clear error
  on(ColisActions.clearColisError, (state): ColisState => ({
    ...state,
    error: null,
  })),

  // Refresh
  on(ColisActions.refreshColis, (state): ColisState => ({
    ...state,
    loading: true,
    error: null,
  }))
);
