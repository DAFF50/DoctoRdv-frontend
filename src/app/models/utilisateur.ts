import {Specialite} from "./specialite";

export class Utilisateur {
  id?: number;
  matricule!: string;
  nom!: string;
  prenom!: string;
  email!: string;
  password!: string;
  telephone?: string;
  dateNaissance?: Date;
  genre?: 'Homme' | 'Femme';
  adresse?: string;
  role!: 'admin' | 'medecin' | 'patient';
  specialite? : Specialite;
  specialite_id? : number;
}
