import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Notifications} from "../models/notifications";

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(private httpClient: HttpClient) { }

  URL = "https://doctordv-backend-latest.onrender.com/api/";

  getAllNotifications() {
    return this.httpClient.get<Notifications[]>(this.URL+"notifications");
  }

}
