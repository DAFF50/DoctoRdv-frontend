import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {PlageHoraire, PlagesParJour} from "../models/plage-horaire";

@Injectable({
  providedIn: 'root'
})
export class PlageHoraireService {

  private apiUrl = 'http://localhost:8000/api';

  constructor(private http: HttpClient) { }

  getMesPlages(): Observable<PlagesParJour> {
    return this.http.get<PlagesParJour>(`${this.apiUrl}/mes-plages`);
  }

  getPlagesByIdMedecin(id: number): Observable<PlagesParJour> {
    return this.http.get<PlagesParJour>(`${this.apiUrl}/plages-horaires/medecin/${id}`);
  }

  savePlages(plages: PlageHoraire[]): Observable<any> {
    return this.http.post(`${this.apiUrl}/mes-plages`, { plages });
  }


  deletePlage(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/plages-horaires/${id}`);
  }

  togglePlage(id: number): Observable<PlageHoraire> {
    return this.http.patch<PlageHoraire>(`${this.apiUrl}/plages-horaires/${id}/toggle`, {});
  }
}
