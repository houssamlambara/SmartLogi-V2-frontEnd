import { COLIS_PRIORITY } from './enums/colis-priority.enum';
import { COLIS_STATUS } from './enums/colis-status.enum';

export interface colis {
  id: string;
  description: string;
  poids: number;
  villeDestination: string;
  destinataire: {
    id: string;
    nom: string;
    prenom: string;
    email: string;
    telephone: string;
    adresse: string;
  };
  clientExpediteur: {
    id: string;
    nom: string;
    prenom: string;
    email: string;
    telephone: string;
    adresse: string;
  };
  livreur: {
    id: string;
    nom: string;
    prenom: string;
    email: string;
    telephone: string;
    adresse: string;
    zone: {
      id: string;
      nom: string;
    };
  } | null;
  zone: {
    id: string;
    nom: string;
    codePostal: number;
  };
  historiqueLivraisonList: {
    id: string;
    status: string;
    changementDate: string;
    comment: string;
  }[];
  produits: {
    id: string;
    nom: string;
    category: string;
    poids: number;
    prix: number;
    quantite: number;
  }[];
  statut: COLIS_STATUS;
  priorite: COLIS_PRIORITY;
}
