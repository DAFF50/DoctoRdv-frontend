// src/app/interceptors/auth.interceptor.ts
import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthService } from '../service/auth.service';
import { Router } from '@angular/router';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // 1️⃣ Récupérer le token
    const token = this.authService.getToken();

    // 2️⃣ Si le token existe, l'ajouter dans le header de TOUTES les requêtes
    if (token) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`  // Format : "Bearer eyJhbGc..."
        }
      });
    }

    // 3️⃣ Envoyer la requête et gérer les erreurs
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        // ❌ Si erreur 401 (token invalide/expiré), déconnecter
        if (error.status === 401) {
          this.authService.logout();
        }

        // ❌ Si erreur 403 (pas le bon rôle), rediriger
        if (error.status === 403) {
          this.router.navigate(['/unauthorized']);
        }

        return throwError(() => error);
      })
    );
  }
}
