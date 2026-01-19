import { newSenderModel } from '../../../core/models/new-sender.model';
import { COLIS_PRIORITY } from './enums/colis-priority.enum';
import { COLIS_STATUS } from './enums/colis-status.enum';

export interface createColisModel {
  description: string;
  villeDestination: string;
  poids: number;
  priorite: string;
  clientExpediteurId: string;
  destinataireId: string;
  zoneId: string;
  productIds: string[];
  nouveauxProduits: any[];
}
