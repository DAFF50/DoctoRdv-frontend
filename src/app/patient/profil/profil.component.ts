import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../service/auth.service';
import { Utilisateur } from '../../models/utilisateur';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {UtilisateurService} from "../../service/utilisateur.service";

@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.css']
})
export class ProfilComponent implements OnInit {


  formUtilisateur!: FormGroup;
  passwordForm!: FormGroup;

  submitted = false;
  submitted2 = false;

  userConnected!: Utilisateur;

  constructor(private authService: AuthService, private fb: FormBuilder, private utilisateurService: UtilisateurService) { }

  editMode = false;

  ngOnInit(): void {
    this.chargerProfil();
  }

  chargerProfil(): void {
    const currentUser = this.authService.getCurrentUser();

    if (currentUser && !this.submitted) {
      this.userConnected = currentUser;
      this.initForms();
    } else {
      this.authService.me().subscribe({
        next: (user) => {
          this.userConnected = user;
          this.initForms();
        },
        error: (err) => console.error('Erreur profil:', err)
      });
    }
  }

  // 🔹 Initialiser les formulaires
  initForms(): void {
    this.formUtilisateur = this.fb.group({
      prenom: [this.userConnected.prenom, Validators.required],
      nom: [this.userConnected.nom, Validators.required],
      telephone: [this.userConnected.telephone, Validators.required],
      dateNaissance: [this.userConnected.dateNaissance, Validators.required],
      genre: [this.userConnected.genre, Validators.required],
      adresse: [this.userConnected.adresse, Validators.required]
    });

    this.passwordForm = this.fb.group({
      currentPassword: ['', Validators.required],
      newPassword: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', Validators.required]
    });
    this.formUtilisateur.disable();
  }

  // 🔹 Activer / désactiver le mode édition
  toggleEdit(): void {
    this.editMode = !this.editMode;
    if (this.editMode) {
      this.formUtilisateur.enable();
    } else {
      this.initForms();
      this.formUtilisateur.disable();
    }
  }

  passwordsDoNotMatch() {
    return this.f3['newPassword'].value && this.f3['confirmPassword'].value &&
      this.f3['newPassword'].value !== this.f3['confirmPassword'].value;
  }

  get f2() {
    return this.formUtilisateur.controls;
  }

  get f3() {
    return this.passwordForm.controls;
  }


  onSubmit() {


    if (this.formUtilisateur.valid) {

      const formValue = this.formUtilisateur.value;
      this.userConnected.nom = formValue.nom;
      this.userConnected.prenom = formValue.prenom;
      this.userConnected.telephone = formValue.telephone;
      this.userConnected.dateNaissance = formValue.dateNaissance;
      this.userConnected.genre = formValue.genre;
      this.userConnected.adresse = formValue.adresse;

      this.utilisateurService.updateProfile(this.userConnected).subscribe(
        () => {
          this.submitted = true;
          this.chargerProfil();
          this.toggleEdit();
        },
        (error) => {
          console.error('Erreur serveur:', error);
        }
      )
    }
  }

  onChangePassword() {
    this.submitted2 = true;

    if (this.passwordForm.valid && !this.passwordsDoNotMatch()) {
      const passwordData = {
        currentPassword: this.f3['currentPassword'].value,
        newPassword: this.f3['newPassword'].value,
        confirmPassword: this.f3['confirmPassword'].value
      };

      this.utilisateurService.updatePassword(passwordData).subscribe({
        next: (res) => {
          alert("Mot de passe changé avec succès !");
          this.passwordForm.reset();
          this.submitted2 = false;
        },
        error: (err) => {
          console.error("Erreur changement mot de passe:", err);
          alert("Impossible de changer le mot de passe");
        }
      });
    }
  }

}
