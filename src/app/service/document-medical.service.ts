import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";


@Injectable({
  providedIn: 'root'
})
export class DocumentMedicalService {

  constructor(private httpClient: HttpClient) { }

  URL = environment.apiUrl;

  save(data: FormData, id: number) {
    return this.httpClient.post(this.URL+"document-medicaux/"+id, data);
  }
}

