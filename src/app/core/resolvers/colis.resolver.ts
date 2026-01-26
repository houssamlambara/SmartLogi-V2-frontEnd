import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, take, tap } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { Colis } from '../../store/colis/colis.state';
import { selectColisById } from '../../store/colis/colis.selectors';
import { loadColisById } from '../../store/colis/colis.actions';

@Injectable({
  providedIn: 'root',
})
export class ColisResolver implements Resolve<Colis | null> {
  constructor(private store: Store) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Colis | null> {
    const id = route.paramMap.get('id');

    if (!id) {
      return new Observable((observer) => {
        observer.next(null);
        observer.complete();
      });
    }

    return this.store.select(selectColisById(id)).pipe(
      tap((colis) => {
        if (!colis) {
          this.store.dispatch(loadColisById({ id }));
        }
      }),
      filter((colis) => !!colis),
      take(1)
    );
  }
}
