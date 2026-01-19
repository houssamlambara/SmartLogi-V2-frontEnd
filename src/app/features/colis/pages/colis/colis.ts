import { ChangeDetectorRef, Component, inject, OnInit, signal } from '@angular/core';
import { Card } from '../../components/card/card';
import { colisService } from '../../../../core/services/colis.service';

import { colis } from '../../models/get-colis.model';
import { COLIS_STATUS } from '../../models/enums/colis-status.enum';
import { toast } from 'ngx-sonner';
import { finalize, map } from 'rxjs';
import { jwtService } from '../../../../core/services/jwt.service';
import { RouterLink } from "@angular/router";
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-colis',
  imports: [Card, RouterLink, FormsModule],
  templateUrl: './colis.html',
  styleUrl: './colis.css',
})

export class Colis implements OnInit {
  private colisServ = inject(colisService);
  private detector = inject(ChangeDetectorRef);
  private jwt = inject(jwtService);

  searchTerm: string = "";
  colis = signal<colis[]>([]);
  errorMessage: string = "";

  ngOnInit(): void {
    this.getAllColis();
  }

  isLivreur(): boolean {
    return this.jwt.getRole() === 'LIVREUR';
  }

  getUsername(): string {
    return this.jwt.getUsername() || 'Driver';
  }

  getTotalWeight(): number {
    return this.colis().reduce((acc, c) => acc + c.poids, 0);
  }

  getCompletedCount(): number {
    return this.colis().filter(c => c.statut === COLIS_STATUS.LIVRED).length;
  }

  onSearch() {
    const term = this.searchTerm.toLowerCase();

    if (term == "") {
      this.ngOnInit()
    } else {
      this.colis.set(
        this.colis().filter(
          item => item.description.toLowerCase().includes(term)
        )
      )
    }
  }

  getAllColis() {
    this.colisServ
      .getColis()
      .subscribe({
        next: (res) => {
          this.colis.set(res);
        },
        error: (err: any) => {
          this.errorMessage = err?.error?.message;
          this.detector.markForCheck()
          toast.error(err?.error?.message);
        },
      });
  }

  isAdminOrSender(): boolean {
    const role = this.jwt.getRole();
    if (role == "GESTIONNAIRE") {
      return true;
    } else if (role == "CLIENT") {
      return true;
    }
    return false;
  }
}
