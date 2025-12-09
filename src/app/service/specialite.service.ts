import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Specialite} from "../models/specialite";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class SpecialiteService {

  URL = environment.apiUrl;

  constructor(private httpClient: HttpClient) {
  }

  getAllSpecialites() {
    return this.httpClient.get<Specialite[]>(this.URL+"specialites");
  }

  save(data: Specialite) {
    return this.httpClient.post(this.URL+"specialites", data);
  }

  deleteSpecialite(id: number) {
    return this.httpClient.delete(this.URL+"specialites/" + id);
  }

  update(data: Specialite) {
    return this.httpClient.put(this.URL+"specialites/" + data.id, data);
  }

  getSpecialiteById(id: number) {
    return this.httpClient.get<Specialite>(this.URL+"specialites/" + id);
  }

}
