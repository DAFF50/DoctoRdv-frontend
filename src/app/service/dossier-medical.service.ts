import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {DossierMedical} from "../models/dossier-medical";
import {Utilisateur} from "../models/utilisateur";
import {Observable} from "rxjs";
import {RendezVous} from "../models/rendez-vous";

@Injectable({
  providedIn: 'root'
})
export class DossierMedicalService {

  private apiUrl = 'https://doctordv-backend-latest.onrender.com/api/';

  constructor(private httpClient: HttpClient) {
  }

  getMedecinPatients(): Observable<Utilisateur[]> {
    return this.httpClient.get<Utilisateur[]>(this.apiUrl+"medecin/patients");
  }

  save(data: DossierMedical) {
    return this.httpClient.post(this.apiUrl+"dossier-medicaux", data);
  }

  getAllDossierMedicals(): Observable<DossierMedical[]> {
    return this.httpClient.get<DossierMedical[]>(this.apiUrl+"dossier-medicaux");
  }

  getDossierMedicalById(id: number): Observable<DossierMedical> {
    return this.httpClient.get<DossierMedical>(this.apiUrl + "dossier-medicaux/" + id);
  }

}
