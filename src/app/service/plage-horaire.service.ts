import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {PlageHoraire, PlagesParJour} from "../models/plage-horaire";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class PlageHoraireService {

  URL = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getMesPlages(): Observable<PlagesParJour> {
    return this.http.get<PlagesParJour>(`${this.URL}/mes-plages`);
  }

  getPlagesByIdMedecin(id: number): Observable<PlagesParJour> {
    return this.http.get<PlagesParJour>(`${this.URL}/plages-horaires/medecin/${id}`);
  }

  savePlages(plages: PlageHoraire[]): Observable<any> {
    return this.http.post(`${this.URL}/mes-plages`, { plages });
  }


  deletePlage(id: number): Observable<any> {
    return this.http.delete(`${this.URL}/plages-horaires/${id}`);
  }

  togglePlage(id: number): Observable<PlageHoraire> {
    return this.http.patch<PlageHoraire>(`${this.URL}/plages-horaires/${id}/toggle`, {});
  }
}
