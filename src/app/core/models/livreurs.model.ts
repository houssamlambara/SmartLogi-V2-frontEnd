import { CityModel } from "./city.model";

export interface livreurModel {
  id: string;
  nom: string;
  prenom: string;
  telephone: string;
  vehicule: string;
  zone: CityModel;
}
