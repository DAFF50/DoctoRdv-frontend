// src/app/pages/login/login.component.ts
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm: FormGroup;
  errorMessage: string = '';
  isLoading: boolean = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    // Créer le formulaire avec validation
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  onSubmit(): void {
    // 1️⃣ Vérifier si le formulaire est valide
    if (this.loginForm.invalid) {
      return;
    }

    // 2️⃣ Afficher le loader
    this.isLoading = true;
    this.errorMessage = '';

    // 3️⃣ Récupérer les valeurs
    const { email, password } = this.loginForm.value;

    // 4️⃣ Appeler le service de connexion
    this.authService.login(email, password).subscribe({
      next: (response) => {
        // ✅ Succès : rediriger selon le rôle
        const role = response.user.role;

        if (role === 'admin') {
          this.router.navigate(['/admin/dashboard']);
        } else if (role === 'medecin') {
          this.router.navigate(['/medecin/dashboard']);
        } else if (role === 'patient') {
          this.router.navigate(['/patient/dashboard']);
        }
      },
      error: (error) => {
        // ❌ Erreur : afficher le message
        this.isLoading = false;
        this.errorMessage = error.error.error || 'Une erreur est survenue';
      },
      complete: () => {
        this.isLoading = false;
      }
    });
  }
}
