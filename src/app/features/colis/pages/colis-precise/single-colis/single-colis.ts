import { ChangeDetectorRef, Component, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { colis } from '../../../models/get-colis.model';
import { colisService } from '../../../../../core/services/colis.service';
import { toast } from 'ngx-sonner';
import { CommonModule, DatePipe, CurrencyPipe, DecimalPipe } from '@angular/common';

import { COLIS_PRIORITY } from '../../../models/enums/colis-priority.enum';
import { COLIS_STATUS } from '../../../models/enums/colis-status.enum';
import { finalize, pipe } from 'rxjs';
import { jwtService } from '../../../../../core/services/jwt.service';
import { ApiService } from '../../../../../core/services/api.service';
import { livreurService } from '../../../../../core/services/livreurs.service';
import { livreurModel } from '../../../../../core/models/livreurs.model';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-single-colis',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './single-colis.html',

})
export class SingleColis implements OnInit {
  private router = inject(ActivatedRoute);
  private colisSer = inject(colisService);
  private detector = inject(ChangeDetectorRef);
  private _jwtService = inject(jwtService);
  private _apiService = inject(ApiService);
  private _livreurService = inject(livreurService);

  colisId: string | null = this.router.snapshot.paramMap.get('id');
  colis = signal<colis | null>(null);
  livreurs = signal<livreurModel[] | null>([]);
  errorMessage: string = '';

  readonly Statut = COLIS_STATUS;
  readonly Priorite = COLIS_PRIORITY;

  selectedLivreur: string = '';
  statusSelect: string = "";

  isAdmin(): boolean {
    return this._jwtService.getRole() == 'GESTIONNAIRE';
  }

  isLivreur(): boolean {
    return this._jwtService.getRole() == "LIVREUR";
  }

  assignLivreur(colisId: string | undefined) {
    return this._livreurService
      .assignLivreur(colisId!, this.selectedLivreur)
      .pipe(
        finalize(() => {
          this.getColisInformation();
        })
      )
      .subscribe({
        next: () => {
          toast.success('livreur assigned successfully!');
        },
        error: (err) => {
          toast.error(err.error.message);
        },
      });
  }

  updateColisStatus(colisId: string | undefined) {
    console.log(this.statusSelect)
    this._livreurService.updateStatusByLivreur(colisId, this.statusSelect)
      .subscribe({
        next: () => {
          toast.success("status updated successfully");
          this.getColisInformation();
        },
        error: (err) => {
          toast.error(err.error.message);
        }
      })
  }

  getAllLivreurs() {
    return this._livreurService.getLivreurs().subscribe({
      next: (resp) => {
        // Show all livreurs for now to ensure data visibility
        this.livreurs.set(resp);

        // Optional: Filter logic can be re-enabled later if needed
        // if (this.colis()?.statut == "IN_STOCK") {
        //   this.livreurs.set(resp.filter((liv) => liv.zone.nom.includes("Maroc")));
        // } else {
        //   this.livreurs.set(resp.filter((liv) => liv.zone.nom.includes(this.colis()?.zone.nom!)));
        // }
      },
      error: (err) => {
        if (this.isAdmin()) {
          if (err.error.message) {
            toast.error(err.error.message);
          }
        }
      },
    });
  }

  getColisInformation() {
    this.colisSer
      .getColisById(this.colisId)
      .pipe()
      .subscribe({
        next: (res) => {
          this.colis.set(res);
          this.getAllLivreurs();
        },
        error: (err: any) => {
          this.errorMessage = err.error.message;
          toast.error(err.error.message);
        },
      });
  }

  ngOnInit(): void {
    this.getColisInformation();
  }
}
