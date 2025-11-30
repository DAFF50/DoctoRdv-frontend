import {Component, OnInit} from '@angular/core';
import {Utilisateur} from "../../models/utilisateur";
import {Router} from "@angular/router";
import {UtilisateurService} from "../../service/utilisateur.service";

@Component({
  selector: 'app-utilisateur',
  templateUrl: './utilisateur.component.html',
  styleUrl: './utilisateur.component.css'
})
export class UtilisateurComponent implements OnInit {

  utilisateurs: Utilisateur[] = [];

  constructor(private router: Router, private utilisateurService: UtilisateurService) {

  }

  ngOnInit() {
    this.getAllUtilisateurs()
  }

  getAge(dateNaissance: string | Date): number {
    if (!dateNaissance) return 0;

    const birthDate = new Date(dateNaissance);
    const today = new Date();

    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();

    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--; // si la date d'anniversaire n'est pas encore passée cette année
    }

    return age;
  }


  getAllUtilisateurs() {
    this.utilisateurService.getAllUtilisateurs().subscribe(
      (data: Utilisateur[]) => {
        this.utilisateurs = data;
        console.log(this.utilisateurs);
        //console.log(data);
        //console.log("success");
      },
      (error) => {
        console.log(error);
      }
    )
  }


  deleteSpecialite(id: number) {
    this.utilisateurService.deleteUtilisateur(id).subscribe(
      () => {
        this.getAllUtilisateurs()
      },
      (error) => {
        console.log(error);
      }
    )
  }

}
