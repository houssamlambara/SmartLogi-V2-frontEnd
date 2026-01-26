import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, catchError, switchMap } from 'rxjs/operators';
import { receviersService } from '../../core/services/receiver.service';
import * as ReceiversActions from './receivers.actions';
import { Receiver } from './receivers.state';

@Injectable()
export class ReceiversEffects {
  constructor(
    private actions$: Actions,
    private receiverService: receviersService
  ) {}

  loadReceivers$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ReceiversActions.loadReceivers),
      switchMap(() =>
        this.receiverService.getAllReceivers().pipe(
          map((response: any) => {
            const receivers: Receiver[] = Array.isArray(response)
              ? response.map((item: any) => ({
                  id: item.id || item.receiverId,
                  firstName: item.firstName || item.prenom || '',
                  lastName: item.lastName || item.nom || '',
                  email: item.email || '',
                  phoneNumber: item.phoneNumber || item.telephone || '',
                  address: item.address || item.adresse,
                  city: item.city || item.ville,
                  postalCode: item.postalCode || item.codePostal,
                }))
              : [];

            return ReceiversActions.loadReceiversSuccess({ receivers });
          }),
          catchError((error) =>
            of(
              ReceiversActions.loadReceiversFailure({
                error: error.error?.message || 'Erreur lors du chargement des destinataires',
              })
            )
          )
        )
      )
    )
  );
}
