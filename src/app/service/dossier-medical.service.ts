import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {DossierMedical} from "../models/dossier-medical";
import {Utilisateur} from "../models/utilisateur";
import {Observable} from "rxjs";
import {RendezVous} from "../models/rendez-vous";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class DossierMedicalService {

  URL = environment.apiUrl;

  constructor(private httpClient: HttpClient) {
  }

  getMedecinPatients(): Observable<Utilisateur[]> {
    return this.httpClient.get<Utilisateur[]>(this.URL+"medecin/patients");
  }

  save(data: DossierMedical) {
    return this.httpClient.post(this.URL+"dossier-medicaux", data);
  }

  getAllDossierMedicals(): Observable<DossierMedical[]> {
    return this.httpClient.get<DossierMedical[]>(this.URL+"dossier-medicaux");
  }

  getDossierMedicalById(id: number): Observable<DossierMedical> {
    return this.httpClient.get<DossierMedical>(this.URL + "dossier-medicaux/" + id);
  }

}
