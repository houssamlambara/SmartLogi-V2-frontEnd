import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { map, catchError, tap, switchMap, exhaustMap } from 'rxjs/operators';
import { AuthService } from '../../core/services/auth.service';
import { jwtService } from '../../core/services/jwt.service';
import * as AuthActions from './auth.actions';
import { User } from './auth.state';

/**
 * Effects pour gérer les side effects liés à l'authentification
 */
@Injectable()
export class AuthEffects {
  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private jwtService: jwtService,
    private router: Router
  ) {}

  /**
   * Effect pour gérer le login
   */
  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.login),
      exhaustMap((action) =>
        this.authService.login({ email: action.email, password: action.password }).pipe(
          map((response) => {
            // Extraire les données utilisateur du token JWT
            const token = response.data.token;
            const decodedToken = this.jwtService.decodeToken(token);

            const user: User = {
              id: decodedToken?.sub || '',
              email: action.email,
              firstName: decodedToken?.firstName || '',
              lastName: decodedToken?.lastName || '',
              roles: decodedToken?.roles || [this.jwtService.getRole() || ''],
            };

            return AuthActions.loginSuccess({ user, token });
          }),
          catchError((error) =>
            of(AuthActions.loginFailure({ error: error.error?.message || 'Échec de connexion' }))
          )
        )
      )
    )
  );

  /**
   * Effect pour rediriger après un login réussi
   */
  loginSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActions.loginSuccess),
        tap(({ user }) => {
          // Stocker le token dans localStorage (déjà fait par le service)
          // Redirection basée sur le rôle
          if (user.roles.includes('GESTIONNAIRE')) {
            this.router.navigate(['/admin']);
          } else if (user.roles.includes('CLIENT')) {
            this.router.navigate(['/colis']);
          } else if (user.roles.includes('LIVREUR')) {
            this.router.navigate(['/colis']);
          } else {
            this.router.navigate(['/']);
          }
        })
      ),
    { dispatch: false }
  );

  /**
   * Effect pour gérer le logout
   */
  logout$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.logout),
      tap(() => {
        this.authService.logout();
      }),
      map(() => AuthActions.logoutSuccess()),
      catchError((error) =>
        of(AuthActions.logoutFailure({ error: error.message || 'Échec de déconnexion' }))
      )
    )
  );

  /**
   * Effect pour rediriger après un logout réussi
   */
  logoutSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActions.logoutSuccess),
        tap(() => {
          this.router.navigate(['/auth/login']);
        })
      ),
    { dispatch: false }
  );

  /**
   * Effect pour vérifier l'authentification au démarrage
   */
  checkAuth$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.checkAuth),
      switchMap(() => {
        const token = this.authService.getToken();

        if (!token || !this.authService.isLoggedIn()) {
          return of(AuthActions.checkAuthFailure());
        }

        const decodedToken = this.jwtService.decodeToken(token);
        const user: User = {
          id: decodedToken?.sub || '',
          email: decodedToken?.email || '',
          firstName: decodedToken?.firstName || '',
          lastName: decodedToken?.lastName || '',
          roles: decodedToken?.roles || [this.jwtService.getRole() || ''],
        };

        return of(AuthActions.checkAuthSuccess({ user, token }));
      }),
      catchError(() => of(AuthActions.checkAuthFailure()))
    )
  );

  /**
   * Effect pour gérer le callback OAuth2
   */
  oauth2Callback$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.oauth2Callback),
      switchMap(({ code }) => {
        // TODO: Implémenter l'appel API pour échanger le code contre un token
        // Pour l'instant, on retourne une erreur
        return of(AuthActions.oauth2Failure({ error: 'OAuth2 non implémenté' }));
      })
    )
  );
}
