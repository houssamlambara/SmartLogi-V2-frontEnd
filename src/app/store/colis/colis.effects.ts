import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, catchError, switchMap, tap, exhaustMap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { colisService } from '../../core/services/colis.service';
import * as ColisActions from './colis.actions';
import { Colis } from './colis.state';

/**
 * Effects pour gérer les side effects liés aux colis
 */
@Injectable()
export class ColisEffects {
  constructor(
    private actions$: Actions,
    private colisService: colisService,
    private router: Router
  ) {}

  /**
   * Effect pour charger la liste des colis
   */
  loadColis$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ColisActions.loadColis, ColisActions.refreshColis),
      switchMap((action) =>
        this.colisService.getColis().pipe(
          map((response: any[]) => {
            // Transformer la réponse en format Colis
            const colis: Colis[] = response.map((item: any) => ({
              id: item.id || item.colisId,
              trackingNumber: item.trackingNumber || item.numeroSuivi,
              description: item.description || '',
              weight: item.weight || item.poids || 0,
              dimensions: item.dimensions,
              status: item.status || item.statut || 'EN_ATTENTE',
              senderName: item.senderName || item.expediteurNom,
              receiverName: item.receiverName || item.destinataireNom,
              senderCity: item.senderCity || item.villeExpediteur,
              receiverCity: item.receiverCity || item.villeDestinataire,
              createdAt: item.createdAt || item.dateCreation,
              updatedAt: item.updatedAt || item.dateModification,
              deliveryDate: item.deliveryDate || item.dateLivraison,
              price: item.price || item.prix,
            }));

            return ColisActions.loadColisSuccess({
              colis,
              totalItems: colis.length,
            });
          }),
          catchError((error) =>
            of(
              ColisActions.loadColisFailure({
                error: error.error?.message || 'Erreur lors du chargement des colis',
              })
            )
          )
        )
      )
    )
  );

  /**
   * Effect pour charger un colis par ID
   */
  loadColisById$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ColisActions.loadColisById),
      switchMap(({ id }) =>
        this.colisService.getColisById(id).pipe(
          map((response: any) => {
            const colis: Colis = {
              id: response.id || response.colisId,
              trackingNumber: response.trackingNumber || response.numeroSuivi,
              description: response.description || '',
              weight: response.weight || response.poids || 0,
              dimensions: response.dimensions,
              status: response.status || response.statut || 'EN_ATTENTE',
              senderName: response.senderName || response.expediteurNom,
              receiverName: response.receiverName || response.destinataireNom,
              senderCity: response.senderCity || response.villeExpediteur,
              receiverCity: response.receiverCity || response.villeDestinataire,
              createdAt: response.createdAt || response.dateCreation,
              updatedAt: response.updatedAt || response.dateModification,
              deliveryDate: response.deliveryDate || response.dateLivraison,
              price: response.price || response.prix,
            };

            return ColisActions.loadColisByIdSuccess({ colis });
          }),
          catchError((error) =>
            of(
              ColisActions.loadColisByIdFailure({
                error: error.error?.message || 'Erreur lors du chargement du colis',
              })
            )
          )
        )
      )
    )
  );

  /**
   * Effect pour créer un colis
   */
  createColis$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ColisActions.createColis),
      exhaustMap(({ colis }) =>
        this.colisService.saveColis(colis as any).pipe(
          map((response: any) => {
            const newColis: Colis = {
              id: response.data.id || response.data.colisId,
              trackingNumber: response.data.trackingNumber || response.data.numeroSuivi,
              description: response.data.description || colis.description || '',
              weight: response.data.weight || colis.weight || 0,
              dimensions: response.data.dimensions || colis.dimensions,
              status: response.data.status || 'EN_ATTENTE',
              senderName: response.data.senderName,
              receiverName: response.data.receiverName,
              senderCity: response.data.senderCity,
              receiverCity: response.data.receiverCity,
              createdAt: response.data.createdAt,
              updatedAt: response.data.updatedAt,
              deliveryDate: response.data.deliveryDate,
              price: response.data.price,
            };

            return ColisActions.createColisSuccess({ colis: newColis });
          }),
          catchError((error) =>
            of(
              ColisActions.createColisFailure({
                error: error.error?.message || 'Erreur lors de la création du colis',
              })
            )
          )
        )
      )
    )
  );

  /**
   * Effect pour rediriger après création réussie
   */
  createColisSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(ColisActions.createColisSuccess),
        tap(() => {
          this.router.navigate(['/colis']);
        })
      ),
    { dispatch: false }
  );

  /**
   * Effect pour mettre à jour un colis
   */
  updateColis$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ColisActions.updateColis),
      exhaustMap(({ id, changes }) =>
        // TODO: Implémenter l'appel API pour la mise à jour
        of({ data: { ...changes, id } }).pipe(
          map((response: any) => {
            const updatedColis: Colis = {
              ...changes,
              id,
            } as Colis;

            return ColisActions.updateColisSuccess({ colis: updatedColis });
          }),
          catchError((error) =>
            of(
              ColisActions.updateColisFailure({
                error: error.error?.message || 'Erreur lors de la mise à jour du colis',
              })
            )
          )
        )
      )
    )
  );

  /**
   * Effect pour supprimer un colis
   */
  deleteColis$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ColisActions.deleteColis),
      exhaustMap(({ id }) =>
        // TODO: Implémenter l'appel API pour la suppression
        of({ success: true }).pipe(
          map(() => ColisActions.deleteColisSuccess({ id })),
          catchError((error) =>
            of(
              ColisActions.deleteColisFailure({
                error: error.error?.message || 'Erreur lors de la suppression du colis',
              })
            )
          )
        )
      )
    )
  );
}
