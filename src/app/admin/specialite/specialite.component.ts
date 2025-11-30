import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {SpecialiteService} from "../../service/specialite.service";
import {Specialite} from "../../models/specialite";

@Component({
  selector: 'app-specialite',
  templateUrl: './specialite.component.html',
  styleUrl: './specialite.component.css'
})
export class SpecialiteComponent implements OnInit {

  formSpecialite: FormGroup = new FormGroup({
    libelle: new FormControl('', Validators.required),
    tarif: new FormControl('', [
      Validators.required,
      Validators.min(0) // empêche les valeurs négatives
    ])
  });


  specialites: Specialite[] = [];

  id? : number | null = null;
  specialite !: Specialite;

  submitted = false;

  //IOC injection de dépendance
  constructor(private router: Router, private specialiteService: SpecialiteService) {

  }


  ngOnInit() {
    this.getAllSpecialites()
  }

  get f2(){
    return this.formSpecialite.controls;
  }

  showModal = false;

  openModal() {
    this.showModal = true;
  }

  openEditModal(specialite: Specialite) {
    this.id = specialite.id
    this.getSpecialiteById(this.id!)
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
    this.formSpecialite.reset();
    this.id = null;
    this.submitted = false;
  }

  onSubmit() {
    // console.log(this.formSpecialite.value);
    this.submitted = true;
    if(this.formSpecialite.valid) {
      if (this.id) {
        this.formSpecialite.addControl('id', new FormControl(this.id));
        this.specialiteService.update(this.formSpecialite.value).subscribe(
          () => {
            this.closeModal();
            this.router.navigateByUrl('/admin/specialite');
            this.getAllSpecialites();
            this.formSpecialite.reset();
            this.id = null;
          },
          (error) => {
            console.log(error);
          }
        )
      } else {
        this.formSpecialite.removeControl('id');
        this.specialiteService.save(this.formSpecialite.value).subscribe(
          () => {
            this.closeModal();
            this.router.navigateByUrl('/admin/specialite');
            this.getAllSpecialites();
            this.formSpecialite.reset();
          },
          (error) => {
            console.log(error);
          }
        )
      }
    }
  }

  getAllSpecialites() {
    this.specialiteService.getAllSpecialites().subscribe(
      (data: Specialite[]) => {
        this.specialites = data;
        console.log(this.specialites);
        //console.log(data);
        //console.log("success");
      },
      (error) => {
        console.log(error);
      }
    )
  }

  deleteSpecialite(id: number) {
    this.specialiteService.deleteSpecialite(id).subscribe(
      () => {
        this.getAllSpecialites()
      },
      (error) => {
        console.log(error);
      }
    )
  }

  getSpecialiteById(id: number) {
    this.specialiteService.getSpecialiteById(id).subscribe(
      (data: Specialite) => {
        // console.log(data);
        this.specialite = data;
        this.formSpecialite.patchValue(this.specialite);
      },
      (error) => {
        console.log(error);
      }
    )
  }

}
