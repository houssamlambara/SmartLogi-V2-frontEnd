import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { colis } from '../../models/get-colis.model';
import { COLIS_PRIORITY } from '../../models/enums/colis-priority.enum';
import { COLIS_STATUS } from '../../models/enums/colis-status.enum';
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './card.html',
  styleUrl: './card.css',
})

export class Card {
  @Input() colis: colis = {
    id: '',
    description: '',
    poids: 0,
    villeDestination: '',
    destinataire: {
      id: '',
      nom: '',
      prenom: '',
      email: '',
      telephone: '',
      adresse: ''
    },
    clientExpediteur: {
      id: '',
      nom: '',
      prenom: '',
      email: '',
      telephone: '',
      adresse: ''
    },
    livreur: null,
    zone: {
      id: '',
      nom: '',
      codePostal: 0
    },
    historiqueLivraisonList: [],
    produits: [],
    statut: COLIS_STATUS.CREATED,
    priorite: COLIS_PRIORITY.URGENT
  };

  getStatusLabel(status: COLIS_STATUS): string {
    switch (status) {
      case COLIS_STATUS.CREATED: return 'Créé';
      case COLIS_STATUS.COLLECTED: return 'Collecté';
      case COLIS_STATUS.IN_STOCK: return 'En Entrepôt';
      case COLIS_STATUS.LIVRED: return 'Livré';
      default: return 'Inconnu';
    }
  }

  getStatusClass(status: COLIS_STATUS): string {
    switch (status) {
      case COLIS_STATUS.CREATED: return 'bg-primary-50 text-primary-600 ring-primary-100'; // Violet
      case COLIS_STATUS.COLLECTED: return 'bg-secondary-50 text-secondary-600 ring-secondary-100'; // Rose
      case COLIS_STATUS.IN_STOCK: return 'bg-amber-50 text-amber-600 ring-amber-100'; // Amber (Keep for distinction)
      case COLIS_STATUS.LIVRED: return 'bg-emerald-50 text-emerald-600 ring-emerald-100'; // Emerald (Keep for success)
      default: return 'bg-neutral-50 text-neutral-600 ring-neutral-100';
    }
  }

  getProgress(status: COLIS_STATUS): number {
    switch (status) {
      case COLIS_STATUS.CREATED: return 10;
      case COLIS_STATUS.COLLECTED: return 40;
      case COLIS_STATUS.IN_STOCK: return 70;
      case COLIS_STATUS.LIVRED: return 100;
      default: return 0;
    }
  }

  getProgressClass(status: COLIS_STATUS): string {
    switch (status) {
      case COLIS_STATUS.CREATED: return 'bg-primary-500';
      case COLIS_STATUS.COLLECTED: return 'bg-secondary-500';
      case COLIS_STATUS.IN_STOCK: return 'bg-amber-500';
      case COLIS_STATUS.LIVRED: return 'bg-emerald-500';
      default: return 'bg-neutral-300';
    }
  }

  getPriorityClass(priority: COLIS_PRIORITY): string {
    switch (priority) {
      case COLIS_PRIORITY.URGENT: return 'text-secondary-500 font-bold';
      case COLIS_PRIORITY.NORMALE: return 'text-primary-500 font-medium';
      case COLIS_PRIORITY.NON_URGENT: return 'text-neutral-400';
      default: return 'text-neutral-400';
    }
  }
}
