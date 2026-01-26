import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, take, tap } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { User } from '../../store/auth/auth.state';
import { selectUser } from '../../store/auth/auth.selectors';
import { loadUserProfile } from '../../store/auth/auth.actions';

@Injectable({
  providedIn: 'root',
})
export class UserProfileResolver implements Resolve<User | null> {
  constructor(private store: Store) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<User | null> {
    return this.store.select(selectUser).pipe(
      tap((user) => {
        if (!user) {
          this.store.dispatch(loadUserProfile());
        }
      }),
      filter((user) => !!user),
      take(1)
    );
  }
}
