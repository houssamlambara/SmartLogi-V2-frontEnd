import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { livreurService } from '../services/livreurs.service';
import { livreurModel } from '../models/livreurs.model';

@Injectable({
  providedIn: 'root',
})
export class LivreursResolver implements Resolve<livreurModel[]> {
  constructor(private livreurService: livreurService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<livreurModel[]> {
    return this.livreurService.getLivreurs();
  }
}
