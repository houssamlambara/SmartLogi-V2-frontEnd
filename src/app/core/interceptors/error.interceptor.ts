import { HttpInterceptorFn, HttpErrorResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { catchError, throwError, retry } from 'rxjs';
import { showError } from '../../store/ui/ui.actions';
import { showNotification } from '../../store/ui/ui.actions';
import { logout } from '../../store/auth/auth.actions';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const router = inject(Router);
  const store = inject(Store);

  return next(req).pipe(
    retry({
      count: 2,
      delay: 1000,
      resetOnSuccess: true,
    }),
    catchError((error: HttpErrorResponse) => {
      let errorMessage = 'Une erreur est survenue';

      if (error.error instanceof ErrorEvent) {
        errorMessage = `Erreur: ${error.error.message}`;
      } else {
        switch (error.status) {
          case 400:
            errorMessage = error.error?.message || 'Requête invalide';
            break;
          case 401:
            errorMessage = 'Session expirée. Veuillez vous reconnecter.';
            store.dispatch(logout());
            router.navigate(['/auth/login']);
            break;
          case 403:
            errorMessage = "Vous n'avez pas les droits nécessaires";
            router.navigate(['/unauthorized']);
            break;
          case 404:
            errorMessage = 'Ressource non trouvée';
            break;
          case 409:
            errorMessage = error.error?.message || 'Conflit de données';
            break;
          case 422:
            errorMessage = error.error?.message || 'Données invalides';
            break;
          case 500:
            errorMessage = 'Erreur serveur. Veuillez réessayer plus tard.';
            break;
          case 503:
            errorMessage = 'Service temporairement indisponible';
            break;
          default:
            errorMessage = error.error?.message || `Erreur ${error.status}`;
        }
      }

      store.dispatch(showError({ error: errorMessage }));
      store.dispatch(
        showNotification({
          notification: {
            type: 'error',
            message: errorMessage,
          },
        })
      );

      return throwError(() => error);
    })
  );
};
