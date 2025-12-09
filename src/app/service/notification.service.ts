import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Notifications} from "../models/notifications";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(private httpClient: HttpClient) { }

  URL = environment.apiUrl;

  getAllNotifications() {
    return this.httpClient.get<Notifications[]>(this.URL+"notifications");
  }

}
