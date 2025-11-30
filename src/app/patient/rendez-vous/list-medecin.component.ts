import {Component, OnInit} from '@angular/core';
import {UtilisateurService} from "../../service/utilisateur.service";
import {Utilisateur} from "../../models/utilisateur";

@Component({
  selector: 'app-list-medecin',
  templateUrl: './list-medecin.component.html',
  styleUrl: './list-medecin.component.css'
})
export class ListMedecinComponent implements OnInit {

  ngOnInit() {
    this.getAllMedecins();
  }

  constructor(private utilisateurService: UtilisateurService) {
  }

  medecins: Utilisateur[] = [];

  getAllMedecins() {
    this.utilisateurService.getAllMedecins().subscribe(
      (data: Utilisateur[]) => {
        this.medecins = data;
        console.log(this.medecins);
        //console.log(data);
        //console.log("success");
      },
      (error) => {
        console.log(error);
      }
    )
  }
}
