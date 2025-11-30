import {Component, OnInit} from '@angular/core';
import {RendezVousService} from "../../service/rendez-vous.service";
import {RendezVous} from "../../models/rendez-vous";

@Component({
  selector: 'app-rendez-vous-admin',
  templateUrl: './rendez-vous-admin.component.html',
  styleUrl: './rendez-vous-admin.component.css'
})
export class RendezVousAdminComponent implements OnInit {

  ngOnInit() {
    this.getAllRendezVous();
  }

  constructor(private rendezVousService: RendezVousService) {
  }

  rendezVous: RendezVous[] = [];

  getAllRendezVous() {
    this.rendezVousService.getAllRendezVousAdmin().subscribe(
      (data: RendezVous[]) => {
        this.rendezVous = data;
        console.log(this.rendezVous);
      },
      (error) => {
        console.log(error);
      }
    )
  }

}



