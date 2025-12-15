import {RendezVous} from "./rendez-vous";

export interface RendezVousStatsPatient {
  totalRdv: number;
  totalRdvAVenir: number;
  totalRdvTermine: number;
  totalRdvAnnule: number;
}

export interface DossierMedicalStatsPatient {
  totalDossierMedical: number;
  totalDocument: number;
  totalAnalyse: number;
  totalOrdonnance: number;
  totalRadiographie: number;
}


export interface Statistique {
  rendezVous: RendezVousStatsPatient;
  dossierMedicaux: DossierMedicalStatsPatient;
  prochainRdv: RendezVous;
}
