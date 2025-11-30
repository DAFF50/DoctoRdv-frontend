import {Component, OnInit} from '@angular/core';
import {RendezVousService} from "../../service/rendez-vous.service";
import {RendezVous} from "../../models/rendez-vous";

@Component({
  selector: 'app-rendez-vous',
  templateUrl: './rendez-vous.component.html',
  styleUrl: './rendez-vous.component.css'
})
export class RendezVousComponent implements OnInit {

  ngOnInit() {
    this.getAllRendezVous();
  }

  constructor(private rendezVousService: RendezVousService) {
  }

  rendezVous: RendezVous[] = [];

  getAllRendezVous() {
    this.rendezVousService.getRendezVousByPatient().subscribe(
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
