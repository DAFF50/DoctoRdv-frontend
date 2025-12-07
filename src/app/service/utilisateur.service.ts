import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Utilisateur} from "../models/utilisateur";
import {PasswordChange} from "../models/password-change";

@Injectable({
  providedIn: 'root'
})


export class UtilisateurService {

  constructor(private httpClient: HttpClient) {

  }

  URL = "https://doctordv-backend-latest.onrender.com/";


  getAllUtilisateurs() {
    return this.httpClient.get<Utilisateur[]>(this.URL+"utilisateurs");
  }

  getAllMedecins() {
    return this.httpClient.get<Utilisateur[]>(this.URL+"medecins");
  }

  getMedecinById(id: number) {
    return this.httpClient.get<Utilisateur>(this.URL+"medecins/" + id);
  }

  save(data: Utilisateur) {
    return this.httpClient.post(this.URL+"utilisateurs", data);
  }

  register(data: Utilisateur) {
    return this.httpClient.post(this.URL+"register", data);
  }

  updateProfile(data: Utilisateur) {
    return this.httpClient.post(this.URL+"profile/update", data);
  }

  updatePassword(data: PasswordChange) {
    return this.httpClient.post(this.URL + "profile/updatePassword", data);
  }


  deleteUtilisateur(id: number) {
    return this.httpClient.delete(this.URL+"utilisateurs/" + id);
  }

  update(data: Utilisateur) {
    return this.httpClient.put(this.URL+"utilisateurs/" + data.id, data);
  }

  getUtilisateurById(id: number) {
    return this.httpClient.get<Utilisateur>(this.URL+"utilisateurs/" + id);
  }


}
