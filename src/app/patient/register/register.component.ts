import {Component} from '@angular/core';
import {UtilisateurService} from "../../service/utilisateur.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Utilisateur} from "../../models/utilisateur";
import {Router} from "@angular/router";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {

  formUtilisateur: FormGroup = new FormGroup({
    nom: new FormControl('', [Validators.required, Validators.maxLength(255)]),
    prenom: new FormControl('', [Validators.required, Validators.maxLength(255)]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)]),
    passwordConfirm: new FormControl('', [Validators.required,]),
    telephone: new FormControl('', [Validators.required, Validators.minLength(8), Validators.maxLength(20)]),
    dateNaissance: new FormControl('', [Validators.required]),
    genre: new FormControl('', [Validators.required]), // 'Homme' ou 'Femme'
    adresse: new FormControl('', [Validators.required, Validators.maxLength(255)]),
  });


  submitted = false;

  constructor(private utilisateurService: UtilisateurService, private router: Router) {
  }

  emailError: string = '';

  passwordsDoNotMatch() {
    return this.f2['password'].value && this.f2['passwordConfirm'].value &&
      this.f2['password'].value !== this.f2['passwordConfirm'].value;
  }

  get f2() {
    return this.formUtilisateur.controls;
  }

  onSubmit() {
    // console.log(this.formUtilisateur.value);
    this.submitted = true;

    if (this.formUtilisateur.valid && !this.passwordsDoNotMatch()) {

      const formValue = this.formUtilisateur.value;

      const utilisateur = new Utilisateur();
      utilisateur.nom = formValue.nom;
      utilisateur.prenom = formValue.prenom;
      utilisateur.email = formValue.email;
      utilisateur.password = formValue.password;
      utilisateur.telephone = formValue.telephone;
      utilisateur.dateNaissance = formValue.dateNaissance;
      utilisateur.genre = formValue.genre;
      utilisateur.adresse = formValue.adresse;
      utilisateur.role = 'patient';

      this.utilisateurService.register(utilisateur).subscribe(
        () => {
          this.router.navigateByUrl('/login');
          this.formUtilisateur.reset();
          this.submitted = false;
          this.emailError = '';
        },
        (error) => {
          if (error.status === 422 && error.error.errors?.email) {
            this.emailError = "Cet email existe déjà.";

            // 👉 Fait défiler jusqu’au champ email
            const emailElement = document.getElementById('email');
            if (emailElement) {
              emailElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
          } else {
            console.error('Erreur serveur:', error);
          }
        }
      )
    }
  }
}
