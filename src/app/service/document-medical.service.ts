import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";


@Injectable({
  providedIn: 'root'
})
export class DocumentMedicalService {

  constructor(private httpClient: HttpClient) { }

  private apiUrl = 'http://localhost:8000/api/';

  save(data: FormData, id: number) {
    return this.httpClient.post(this.apiUrl+"document-medicaux/"+id, data);
  }
}
