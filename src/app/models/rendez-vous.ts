import {Utilisateur} from "./utilisateur";

export interface RendezVous {
  id?: number;
  matricule: string;
  dateRdv: string;
  heure: string;
  statut: string;
  motif: string;
  modePaiement: string;
  montant?: number;
  cheminJustificatifPdf?: string;
  medecin_id: number ;
  patient_id: number;
  patient?: Utilisateur;
  medecin?: Utilisateur;
}
