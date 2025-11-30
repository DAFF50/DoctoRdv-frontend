import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Notifications} from "../models/notifications";

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(private httpClient: HttpClient) { }

  URL = "http://127.0.0.1:8000/api/";

  getAllNotifications() {
    return this.httpClient.get<Notifications[]>(this.URL+"notifications");
  }

}
