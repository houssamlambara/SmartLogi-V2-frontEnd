import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { selectUserRoles } from '../../store/auth/auth.selectors';

@Injectable({ providedIn: 'root' })
export class RoleGuard implements CanActivate {
  constructor(
    private store: Store,
    private router: Router
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> {
    const allowedRoles: string[] = route.data['roles'] || [];

    return this.store.select(selectUserRoles).pipe(
      take(1),
      map((userRoles) => {
        const hasRole = userRoles.some((role) => allowedRoles.includes(role));

        if (!hasRole) {
          return this.router.createUrlTree(['/unauthorized']);
        }

        return true;
      })
    );
  }
}
