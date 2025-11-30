// src/app/guards/auth.guard.ts
import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot } from '@angular/router';
import { AuthService } from '../service/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  canActivate(route: ActivatedRouteSnapshot): boolean {
    // 1️⃣ Vérifier si l'utilisateur est connecté
    if (!this.authService.isLoggedIn()) {
      // ❌ Pas connecté → rediriger vers login
      this.router.navigate(['/login']);
      return false;
    }

    // 2️⃣ Vérifier le rôle si spécifié dans la route
    const requiredRole = route.data['role'];

    if (requiredRole) {
      const userRole = this.authService.getUserRole();

      if (userRole !== requiredRole) {
        // ❌ Mauvais rôle → rediriger vers page non autorisé
        this.router.navigate(['/unauthorized']);
        return false;
      }
    }

    // ✅ Tout est OK, autoriser l'accès
    return true;
  }
}
