import { createAction, props } from '@ngrx/store';
import { Colis, ColisFilters } from './colis.state';

/**
 * Actions CRUD pour les colis
 */

// Load colis list
export const loadColis = createAction(
  '[Colis Page] Load Colis',
  props<{ page?: number; pageSize?: number }>()
);

export const loadColisSuccess = createAction(
  '[Colis API] Load Colis Success',
  props<{ colis: Colis[]; totalItems: number }>()
);

export const loadColisFailure = createAction(
  '[Colis API] Load Colis Failure',
  props<{ error: string }>()
);

// Load single colis
export const loadColisById = createAction(
  '[Colis Detail Page] Load Colis By Id',
  props<{ id: string }>()
);

export const loadColisByIdSuccess = createAction(
  '[Colis API] Load Colis By Id Success',
  props<{ colis: Colis }>()
);

export const loadColisByIdFailure = createAction(
  '[Colis API] Load Colis By Id Failure',
  props<{ error: string }>()
);

// Create colis
export const createColis = createAction(
  '[Create Colis Page] Create Colis',
  props<{ colis: Partial<Colis> }>()
);

export const createColisSuccess = createAction(
  '[Colis API] Create Colis Success',
  props<{ colis: Colis }>()
);

export const createColisFailure = createAction(
  '[Colis API] Create Colis Failure',
  props<{ error: string }>()
);

// Update colis
export const updateColis = createAction(
  '[Colis Detail Page] Update Colis',
  props<{ id: string; changes: Partial<Colis> }>()
);

export const updateColisSuccess = createAction(
  '[Colis API] Update Colis Success',
  props<{ colis: Colis }>()
);

export const updateColisFailure = createAction(
  '[Colis API] Update Colis Failure',
  props<{ error: string }>()
);

// Delete colis
export const deleteColis = createAction(
  '[Colis Page] Delete Colis',
  props<{ id: string }>()
);

export const deleteColisSuccess = createAction(
  '[Colis API] Delete Colis Success',
  props<{ id: string }>()
);

export const deleteColisFailure = createAction(
  '[Colis API] Delete Colis Failure',
  props<{ error: string }>()
);

// Select colis
export const selectColis = createAction(
  '[Colis Page] Select Colis',
  props<{ id: string }>()
);

export const deselectColis = createAction('[Colis Page] Deselect Colis');

// Filter actions
export const setColisFilters = createAction(
  '[Colis Page] Set Filters',
  props<{ filters: Partial<ColisFilters> }>()
);

export const clearColisFilters = createAction('[Colis Page] Clear Filters');

// Pagination actions
export const setColisPage = createAction(
  '[Colis Page] Set Page',
  props<{ page: number }>()
);

export const setColisPageSize = createAction(
  '[Colis Page] Set Page Size',
  props<{ pageSize: number }>()
);

// Search action
export const searchColis = createAction(
  '[Colis Page] Search Colis',
  props<{ searchTerm: string }>()
);

// Clear error
export const clearColisError = createAction('[Colis] Clear Error');

// Refresh colis list
export const refreshColis = createAction('[Colis Page] Refresh Colis');
