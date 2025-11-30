import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {RendezVous} from "../models/rendez-vous";
import {AuthService} from "./auth.service";

@Injectable({
  providedIn: 'root'
})
export class RendezVousService {

  constructor(private httpClient: HttpClient, private authService: AuthService,) { }

  URL = "http://127.0.0.1:8000/api/";

  getRendezVousByPatient() {
    return this.httpClient.get<RendezVous[]>(this.URL+"rendez-vous-patient/" + this.authService.getCurrentUser()?.id);
  }

  save(data: RendezVous) {
    return this.httpClient.post(this.URL+"rendez-vous", data);
  }

  getAllRendezVousAdmin() {
    return this.httpClient.get<RendezVous[]>(this.URL+"rendez-vous-admin");
  }

  getRendezVousByMedecin() {
    return this.httpClient.get<RendezVous[]>(this.URL+"rendez-vous-medecin/" + this.authService.getCurrentUser()?.id);
  }

}
