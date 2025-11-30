import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../service/auth.service";
import {DossierMedical} from "../../models/dossier-medical";
import {DossierMedicalService} from "../../service/dossier-medical.service";


@Component({
  selector: 'app-dossier-medical',
  templateUrl: './dossier-medical.component.html',
  styleUrl: './dossier-medical.component.css'
})
export class DossierMedicalComponent implements OnInit {


  constructor(private dossierMedicalService: DossierMedicalService) {
  }

  dossierMedicals: DossierMedical[] = [];

  ngOnInit() {
    this.getAllDossierMedicals();
  }

  getAllDossierMedicals() {
    this.dossierMedicalService.getAllDossierMedicals().subscribe(
      (data: DossierMedical[]) => {
        this.dossierMedicals = data;
        console.log(this.dossierMedicals);
      },
      (error) => {
        console.log(error);
      }
    )
  }

}
