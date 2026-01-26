import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, take, tap } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { Colis } from '../../store/colis/colis.state';
import { selectAllColis, selectColisLoading } from '../../store/colis/colis.selectors';
import { loadColis } from '../../store/colis/colis.actions';

@Injectable({
  providedIn: 'root',
})
export class ColisListResolver implements Resolve<Colis[]> {
  constructor(private store: Store) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Colis[]> {
    return this.store.select(selectAllColis).pipe(
      tap((colis) => {
        if (colis.length === 0) {
          this.store.dispatch(loadColis({}));
        }
      }),
      filter((colis) => colis.length > 0),
      take(1)
    );
  }
}
