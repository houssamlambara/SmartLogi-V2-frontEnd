import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, take, tap } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { Livreur } from '../../store/livreurs/livreurs.state';
import { selectAllLivreurs } from '../../store/livreurs/livreurs.selectors';
import { loadLivreurs } from '../../store/livreurs/livreurs.actions';

@Injectable({
  providedIn: 'root',
})
export class LivreursResolver implements Resolve<Livreur[]> {
  constructor(private store: Store) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Livreur[]> {
    return this.store.select(selectAllLivreurs).pipe(
      tap((livreurs) => {
        if (livreurs.length === 0) {
          this.store.dispatch(loadLivreurs());
        }
      }),
      filter((livreurs) => livreurs.length > 0),
      take(1)
    );
  }
}
