import {DossierMedical} from "./dossier-medical";

export interface DocumentMedical {
  id?: number;
  titre: string;
  description: string;
  type: string;
  cheminFichier?: string;
  dossier_medical_id: number;
  dossier_medical?: DossierMedical;
  created_at?: Date;
  taille_formattee?: string;
}
