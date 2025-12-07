import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";
import {Observable, tap} from "rxjs";
import {Utilisateur} from "../models/utilisateur";


// 📦 Interface pour typer les données
interface LoginResponse {
  access_token: string;
  token_type: string;
  user: any;
  expires_in: number;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  // 🌐 URL de l'API Laravel
  private apiUrl = 'https://doctordv-backend-latest.onrender.com/api';

  constructor(
    private http: HttpClient,
    private router: Router
  ) {}

  // 🔐 MÉTHODE 1 : CONNEXION
  login(email: string, password: string): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.apiUrl}/login`, { email, password })
      .pipe(
        tap((response: LoginResponse) => {
          localStorage.setItem('token', response.access_token);
          localStorage.setItem('user', JSON.stringify(response.user));
          const expiresAt = Date.now() + (response.expires_in * 1000);
          localStorage.setItem('expires_at', expiresAt.toString());

          // 🔑 Rediriger ici seulement après token stocké
          this.router.navigate(['/dashboard']);
        })
      );
  }


  // 🚪 MÉTHODE 2 : DÉCONNEXION
  logout(): void {
    const token = localStorage.getItem('token');

    // 1️⃣ Si pas de token, on nettoie directement
    if (!token) {
      this.clearSession();
      return;
    }

    // 2️⃣ Sinon, on tente d'appeler l'API
    this.http.post(`${this.apiUrl}/logout`, {}).subscribe({
      next: () => this.clearSession(),
      error: (error) => {
        console.warn('Erreur pendant la déconnexion :', error);

        // 3️⃣ Si erreur 401 ou autre, on nettoie quand même
        if (error.status === 401 || error.status === 419) {
          this.clearSession();
        }
      }
    });
  }

// 🔹 Fonction pour nettoyer les données locales et rediriger
  private clearSession(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('expires_at');

    this.router.navigate(['/login']);
  }


  // 🎫 MÉTHODE 3 : Récupérer le token
  getToken(): string | null {
    return localStorage.getItem('token');
  }

  // ✅ MÉTHODE 4 : Vérifier si l'utilisateur est connecté
  isLoggedIn(): boolean {
    const token = this.getToken();
    const expiresAt = localStorage.getItem('expires_at');

    if (!token || !expiresAt) {
      return false;
    }

    // Vérifier si le token n'est pas expiré
    return Date.now() < parseInt(expiresAt);
  }

  // 👤 MÉTHODE 5 : Récupérer l'utilisateur connecté
  getUser(): any {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  }

  // 🎭 MÉTHODE 6 : Récupérer le rôle
  getUserRole(): string | null {
    const user = this.getUser();
    return user ? user.role : null;
  }

  // 🔒 MÉTHODE 7 : Vérifier si l'utilisateur a un rôle spécifique
  hasRole(role: string): boolean {
    return this.getUserRole() === role;
  }

  // 👮 MÉTHODE 8 : Vérifier si c'est un admin
  isAdmin(): boolean {
    return this.hasRole('admin');
  }

  // ⚕️ MÉTHODE 9 : Vérifier si c'est un médecin
  isMedecin(): boolean {
    return this.hasRole('medecin');
  }

  // 🏥 MÉTHODE 10 : Vérifier si c'est un patient
  isPatient(): boolean {
    return this.hasRole('patient');
  }

  me(): Observable<Utilisateur> {
    return this.http.get<Utilisateur>(`${this.apiUrl}/me`)
      .pipe(
        tap((user: Utilisateur) => {
          // Mettre à jour les infos de l'utilisateur
          localStorage.setItem('user', JSON.stringify(user));
        })
      );
  }

  getCurrentUser(): Utilisateur | null {
    const userJson = localStorage.getItem('user');
    if (userJson) {
      return JSON.parse(userJson) as Utilisateur;
    }
    return null; // Aucun utilisateur connecté
  }

}
