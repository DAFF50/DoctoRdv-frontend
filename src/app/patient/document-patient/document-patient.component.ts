import {Component, OnInit} from '@angular/core';
import {DossierMedical} from "../../models/dossier-medical";
import {ActivatedRoute} from "@angular/router";
import {DossierMedicalService} from "../../service/dossier-medical.service";
import {DocumentMedical} from "../../models/document-medical";

@Component({
  selector: 'app-document-patient',
  templateUrl: './document-patient.component.html',
  styleUrl: './document-patient.component.css'
})
export class DocumentPatientComponent implements OnInit {

  id!: number;
  dossierMedical!: DossierMedical;
  documentMedicals: DocumentMedical[] = [];

  constructor(private route: ActivatedRoute, private dossierMedicalService: DossierMedicalService) {
  }

  ngOnInit() {
    if (this.route.snapshot.params['id']) {
      this.id = this.route.snapshot.params['id'];
      this.getDossierMedicalById(this.id);
    }
  }

  getDossierMedicalById(id: number) {
    this.dossierMedicalService.getDossierMedicalById(id).subscribe(
      (data: DossierMedical) => {
        this.dossierMedical = data;
        this.documentMedicals = this.dossierMedical.documents!;
        console.log(data);
      },
      (error) => {
        console.log(error)
      }
    )
  }

  viewDocument(cheminFichier: string) {
    const url = "http://localhost:8000/storage/"+cheminFichier;
    window.open(url, '_blank');
  }

}
