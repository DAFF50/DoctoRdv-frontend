import {Component, OnInit} from '@angular/core';
import {RendezVousService} from "../../service/rendez-vous.service";
import {RendezVous} from "../../models/rendez-vous";

@Component({
  selector: 'app-rendez-vous-medecin',
  templateUrl: './rendez-vous-medecin.component.html',
  styleUrl: './rendez-vous-medecin.component.css'
})
export class RendezVousMedecinComponent implements OnInit {

  ngOnInit() {
    this.getAllRendezVous();
  }

  constructor(private rendezVousService: RendezVousService) {
  }

  rendezVous: RendezVous[] = [];

  getAllRendezVous() {
    this.rendezVousService.getRendezVousByMedecin().subscribe(
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
