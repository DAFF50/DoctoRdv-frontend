import {Component, OnInit} from '@angular/core';
import {Utilisateur} from "../../models/utilisateur";
import {ActivatedRoute, Router} from "@angular/router";
import {UtilisateurService} from "../../service/utilisateur.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Specialite} from "../../models/specialite";
import {SpecialiteService} from "../../service/specialite.service";

@Component({
  selector: 'app-utilisateur',
  templateUrl: './add-utilisateur.component.html',
  styleUrl: './add-utilisateur.component.css'
})
export class AddUtilisateurComponent implements OnInit {

  formUtilisateur: FormGroup = new FormGroup({
    id: new FormControl(''),
    nom: new FormControl('', [Validators.required, Validators.maxLength(255)]),
    prenom: new FormControl('', [Validators.required, Validators.maxLength(255)]),
    email: new FormControl('', [Validators.required, Validators.email]),
    telephone: new FormControl('', [Validators.required, Validators.minLength(8), Validators.maxLength(20)]),
    specialite_id: new FormControl('', Validators.required),
  });

  constructor(private router: Router, private utilisateurService: UtilisateurService, private route: ActivatedRoute, private specialiteService: SpecialiteService) {

  }

  ngOnInit() {
    this.getAllSpecialites();
    if (this.route.snapshot.params['id']) {
      this.id = this.route.snapshot.params['id'];
      this.getUtilisateurById(this.id);
      this.onRoleChange(this.utilisateur.role);
    }
  }

  id!: number;
  utilisateur!: Utilisateur;

  specialites: Specialite[] = [];

  submitted = false;
  emailError: string = '';

  get f2() {
    return this.formUtilisateur.controls;
  }

  selectedRole = 'admin';

  onRoleChange(role: string) {
    this.selectedRole = role;

    const telephoneControl = this.formUtilisateur.get('telephone');

    if (role === 'medecin') {
      // Ajouter les validations pour médecin
      telephoneControl?.setValidators([
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(20)
      ]);
    } else {
      // Retirer les validations pour admin
      telephoneControl?.clearValidators();
    }

    // Important : mettre à jour la validité du champ
    telephoneControl?.updateValueAndValidity();
  }

  onSubmit() {
    this.submitted = true;

    if (this.id) {
      if (this.formUtilisateur.valid) {
        const formValue = this.formUtilisateur.value;
        this.utilisateur.nom = formValue.nom;
        this.utilisateur.prenom = formValue.prenom;
        this.utilisateur.email = formValue.email;
        this.utilisateur.role = this.selectedRole as 'admin' | 'medecin' | 'patient';
        if (this.selectedRole == 'medecin') {
          this.utilisateur.telephone = formValue.telephone;
        }
        this.utilisateurService.update(this.utilisateur).subscribe(
          () => {
            this.router.navigateByUrl('/admin/utilisateur');
            this.formUtilisateur.reset();
          },
          (error) => {
            if (error.status === 422 && error.error.errors?.email) {
              this.emailError = "Cet email existe déjà.";

            } else {
              console.error('Erreur serveur:', error);
            }
          }
        )
      }

    } else {
      if (this.formUtilisateur.valid) {

        const formValue = this.formUtilisateur.value;
        const utilisateur = new Utilisateur();
        utilisateur.nom = formValue.nom;
        utilisateur.prenom = formValue.prenom;
        utilisateur.email = formValue.email;
        utilisateur.password = "passer";
        utilisateur.role = 'admin';
        if (this.selectedRole == 'medecin') {
          utilisateur.telephone = formValue.telephone;
          utilisateur.role = 'medecin';
          utilisateur.specialite_id = formValue.specialite_id;
        }
        this.utilisateurService.save(utilisateur).subscribe(
          () => {
            this.router.navigateByUrl('/admin/utilisateur');
            this.formUtilisateur.reset();
            this.submitted = false;
            this.emailError = '';
          },
          (error) => {
            if (error.status === 422 && error.error.errors?.email) {
              this.emailError = "Cet email existe déjà.";

            } else {
              console.error('Erreur serveur:', error);
            }
          }
        )
      }
    }
  }

  getUtilisateurById(id: number) {
    this.utilisateurService.getUtilisateurById(id).subscribe(
      (data: Utilisateur) => {
        this.utilisateur = data;
        //console.log(this.utilisateur);
        this.formUtilisateur.patchValue(this.utilisateur)

        this.selectedRole = this.utilisateur.role;

        this.onRoleChange(this.selectedRole);
      },
      (error) => {
        console.log(error)
      }
    )
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
}
