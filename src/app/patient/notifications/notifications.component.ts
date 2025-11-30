import {Component, OnInit} from '@angular/core';
import {NotificationService} from "../../service/notification.service";
import {Notifications} from "../../models/notifications";

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrl: './notifications.component.css'
})
export class NotificationsComponent implements OnInit {

  ngOnInit() {
    this.getAllNotifications();
  }

  constructor(private notificationService: NotificationService) {
  }

  notifications: Notifications[] = [];

  getAllNotifications() {
    this.notificationService.getAllNotifications().subscribe(
      (data: Notifications[]) => {
        this.notifications = data;
        console.log(this.notifications);
      },
      (error) => {
        console.log(error);
      }
    )
  }

  objectKeys(obj: Record<string, unknown>): string[] {
    return Object.keys(obj);
  }

}
