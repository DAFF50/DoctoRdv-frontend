import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Utilisateur} from "../../models/utilisateur";
import {DossierMedicalService} from "../../service/dossier-medical.service";
import {DossierMedical} from "../../models/dossier-medical";
import {RendezVous} from "../../models/rendez-vous";

@Component({
  selector: 'app-dossier-medical-medecin',
  templateUrl: './dossier-medical-medecin.component.html',
  styleUrl: './dossier-medical-medecin.component.css'
})
export class DossierMedicalMedecinComponent implements OnInit {

  formDossierMedical: FormGroup = new FormGroup({
    patient_id: new FormControl('', Validators.required),
    libelle: new FormControl('', [Validators.required, Validators.maxLength(255)]),
    description: new FormControl('', [Validators.required, Validators.maxLength(255)]),
  });

  showModal = false;
  submitted = false;

  patients: Utilisateur[] = [];

  ngOnInit() {
    this.getMedecinPatients();
    this.getAllDossierMedicals();
  }


  constructor(private dossierMedicalService: DossierMedicalService) {
  }

  getMedecinPatients() {
    this.dossierMedicalService.getMedecinPatients().subscribe(
      (data: Utilisateur[]) => {
        this.patients = data;
        console.log(this.patients);
        //console.log(data);
        //console.log("success");
      },
      (error) => {
        console.log(error);
      }
    )
  }

  openModal() {
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
    this.formDossierMedical.reset({
      patient_id: '', // <-- valeur par défaut pour que "Sélectionner..." s'affiche
      libelle: '',
      description: ''
    });
    this.submitted = false;
  }


  get f2() {
    return this.formDossierMedical.controls;
  }

  onSubmit() {
    this.submitted = true;
    if (this.formDossierMedical.valid) {
      const formValue = this.formDossierMedical.value;
      const dossierMedical: DossierMedical = {
        libelle: formValue.libelle,
        description: formValue.description,
        patient_id: formValue.patient_id,
      };
      this.dossierMedicalService.save(dossierMedical).subscribe(
        () => {
          this.getAllDossierMedicals();
          this.closeModal();
        },
        (error) => {
          console.log(error);
        },
      )
    }
  }

  dossierMedicals: DossierMedical[] = [];

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
