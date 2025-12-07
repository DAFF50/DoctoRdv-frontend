import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Specialite} from "../models/specialite";

@Injectable({
  providedIn: 'root'
})
export class SpecialiteService {

  URL = "https://doctordv-backend-latest.onrender.com/specialites/";

  constructor(private httpClient: HttpClient) {
  }

  getAllSpecialites() {
    return this.httpClient.get<Specialite[]>(this.URL);
  }

  save(data: Specialite) {
    return this.httpClient.post(this.URL, data);
  }

  deleteSpecialite(id: number) {
    return this.httpClient.delete(this.URL + id);
  }

  update(data: Specialite) {
    return this.httpClient.put(this.URL + data.id, data);
  }

  getSpecialiteById(id: number) {
    return this.httpClient.get<Specialite>(this.URL + id);
  }

}
