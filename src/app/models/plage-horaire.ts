export interface PlageHoraire {
  id?: number;
  medecin_id?: number;
  jour: string;
  heureDebut: string;
  heureFin: string;
  estActive: boolean;
}

export interface PlagesParJour {
  [jour: string]: PlageHoraire[];
}
