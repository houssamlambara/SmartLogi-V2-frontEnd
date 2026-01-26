import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, catchError, switchMap } from 'rxjs/operators';
import { senderService } from '../../core/services/senders.service';
import * as SendersActions from './senders.actions';
import { Sender } from './senders.state';

@Injectable()
export class SendersEffects {
  constructor(
    private actions$: Actions,
    private sendersService: senderService
  ) {}

  loadSenders$ = createEffect(() =>
    this.actions$.pipe(
      ofType(SendersActions.loadSenders),
      switchMap(() =>
        this.sendersService.getAllSenders().pipe(
          map((response: any) => {
            const senders: Sender[] = Array.isArray(response)
              ? response.map((item: any) => ({
                  id: item.id || item.senderId,
                  firstName: item.firstName || item.prenom || '',
                  lastName: item.lastName || item.nom || '',
                  email: item.email || '',
                  phoneNumber: item.phoneNumber || item.telephone || '',
                  address: item.address || item.adresse,
                  city: item.city || item.ville,
                  postalCode: item.postalCode || item.codePostal,
                }))
              : [];

            return SendersActions.loadSendersSuccess({ senders });
          }),
          catchError((error) =>
            of(
              SendersActions.loadSendersFailure({
                error: error.error?.message || 'Erreur lors du chargement des expéditeurs',
              })
            )
          )
        )
      )
    )
  );
}
