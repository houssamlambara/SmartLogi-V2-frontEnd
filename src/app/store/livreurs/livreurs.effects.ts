import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, catchError, switchMap } from 'rxjs/operators';
import { livreurService } from '../../core/services/livreurs.service';
import * as LivreursActions from './livreurs.actions';
import { Livreur } from './livreurs.state';

@Injectable()
export class LivreursEffects {
  constructor(
    private actions$: Actions,
    private livreursService: livreurService
  ) {}

  loadLivreurs$ = createEffect(() =>
    this.actions$.pipe(
      ofType(LivreursActions.loadLivreurs),
      switchMap(() =>
        this.livreursService.getAllLivreurs().pipe(
          map((response: any) => {
            const livreurs: Livreur[] = Array.isArray(response)
              ? response.map((item: any) => ({
                  id: item.id || item.livreurId,
                  firstName: item.firstName || item.prenom || '',
                  lastName: item.lastName || item.nom || '',
                  email: item.email || '',
                  phoneNumber: item.phoneNumber || item.telephone || '',
                  vehicleType: item.vehicleType || item.typeVehicule,
                  status: item.status || 'OFFLINE',
                  currentLocation: item.currentLocation,
                }))
              : [];

            return LivreursActions.loadLivreursSuccess({ livreurs });
          }),
          catchError((error) =>
            of(
              LivreursActions.loadLivreursFailure({
                error: error.error?.message || 'Erreur lors du chargement des livreurs',
              })
            )
          )
        )
      )
    )
  );
}
