import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";


@Injectable({
  providedIn: 'root'
})
export class DocumentMedicalService {

  constructor(private httpClient: HttpClient) { }

  private apiUrl = 'https://doctordv-backend-latest.onrender.com/api/';

  save(data: FormData, id: number) {
    return this.httpClient.post(this.apiUrl+"document-medicaux/"+id, data);
  }
}

