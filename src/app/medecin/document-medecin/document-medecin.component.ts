import {Component, OnInit} from '@angular/core';
import {DossierMedical} from "../../models/dossier-medical";
import {ActivatedRoute} from "@angular/router";
import {DossierMedicalService} from "../../service/dossier-medical.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {DocumentMedical} from "../../models/document-medical";
import {DocumentMedicalService} from "../../service/document-medical.service";
import {Specialite} from "../../models/specialite";


@Component({
  selector: 'app-document-medecin',
  templateUrl: './document-medecin.component.html',
  styleUrl: './document-medecin.component.css'
})
export class DocumentMedecinComponent implements OnInit {

  id!: number;
  dossierMedical!: DossierMedical;
  documentMedicals: DocumentMedical[] = [];

  showModal = false;
  showModal2 = false;
  submitted = false;

  selectedFile?: File;
  submittedFile = false;


  formDocumentMedical: FormGroup = new FormGroup({
    titre: new FormControl('', [Validators.required, Validators.maxLength(255)]),
    description: new FormControl('', [Validators.required, Validators.maxLength(255)]),
    type: new FormControl('', Validators.required),
  });


  constructor(private route: ActivatedRoute, private dossierMedicalService: DossierMedicalService, private documentMedicalService: DocumentMedicalService) {
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

  get f2() {
    return this.formDocumentMedical.controls;
  }

  openModal() {
    this.showModal = true;
    this.showModal2 = false;
  }

  closeModal() {
    this.showModal = false;
    this.formDocumentMedical.reset({
      type: '',
      titre: '',
      description: ''
    });
    this.submitted = false;
  }

  closeModal2() {
    this.showModal2 = false;
  }

  backToModal1() {
    this.showModal2 = false;
    this.showModal = true;
  }


  onSubmit() {
    this.submitted = true;
    if (this.formDocumentMedical.valid) {
      this.showModal = false;
      this.showModal2 = true;
    }
  }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;

    if (input.files && input.files.length > 0) {
      const file = input.files[0];

      // Vérifie l'extension ou le type MIME
      if (file.type !== 'application/pdf') {
        alert('Seuls les fichiers PDF sont autorisés.');
        this.selectedFile = undefined;
        input.value = ''; // reset l'input
        return;
      }

      this.selectedFile = file;
    }
  }


  submitFinal() {
    this.submittedFile = true;

    if (!this.selectedFile) {
      return;
    }

    const formValue = this.formDocumentMedical.value;

    const formData = new FormData();
    formData.append('titre', formValue.titre);
    formData.append('description', formValue.description);
    formData.append('type', formValue.type);
    formData.append('file', this.selectedFile);

    this.documentMedicalService.save(formData, this.id).subscribe(
      (data) => {
        console.log(data);
      },
      (error) => {
        console.log(error);
      }
    );

    this.closeModal()
    this.showModal2 = false;
  }

  viewDocument(cheminFichier: string) {
    const url = "http://localhost:8000/storage/"+cheminFichier;
    window.open(url, '_blank');
  }

}
