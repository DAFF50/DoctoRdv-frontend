import {Utilisateur} from "./utilisateur";
import {DocumentMedical} from "./document-medical";

export interface DossierMedical {
  id?: number;
  matricule?: string;
  libelle: string;
  description: string;
  patient_id: number;
  patient?: Utilisateur;
  medecin?: Utilisateur;
  created_at?: Date;
  documents?: DocumentMedical[];
}
