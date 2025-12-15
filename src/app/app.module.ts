import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LandingComponent } from './landing/landing.component';
import { RegisterComponent } from './patient/register/register.component';
import { LoginComponent } from './login/login.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { VerifyOtpComponent } from './verify-otp/verify-otp.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { SidebarPatientComponent } from './patient/sidebar-patient/sidebar-patient.component';
import { SidebarAdminComponent } from './admin/sidebar-admin/sidebar-admin.component';
import { SidebarMedecinComponent } from './medecin/sidebar-medecin/sidebar-medecin.component';
import { RendezVousComponent } from './patient/rendez-vous/rendez-vous.component';
import { AddRendezVousComponent } from './patient/rendez-vous/add-rendez-vous.component';
import { ListMedecinComponent } from "./patient/rendez-vous/list-medecin.component";
import { ChatIaComponent } from './patient/chat-ia/chat-ia.component';
import { NotificationsComponent } from './patient/notifications/notifications.component';
import { ProfilComponent } from './patient/profil/profil.component';
import { DashboardComponent } from './patient/dashboard/dashboard.component';
import { DossierMedicalComponent } from './patient/dossier-medical/dossier-medical.component';
import { SpecialiteComponent } from './admin/specialite/specialite.component';
import { UtilisateurComponent } from './admin/utilisateur/utilisateur.component';
import { DashboardAdminComponent } from './admin/dashboard-admin/dashboard-admin.component';
import { RendezVousAdminComponent } from './admin/rendez-vous-admin/rendez-vous-admin.component';
import { PaiementAdminComponent } from './admin/paiement-admin/paiement-admin.component';
import { AddUtilisateurComponent } from "./admin/utilisateur/add-utilisateur.component";

// ⭐ Importer le service et l'intercepteur d'authentification
import { AuthService } from './service/auth.service';
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { UnauthorizedComponent } from './unauthorized/unauthorized.component';
import { DashboardMedecinComponent } from './medecin/dashboard-medecin/dashboard-medecin.component';
import { PlageHoraireMedecinComponent } from './medecin/plage-horaire-medecin/plage-horaire-medecin.component';
import { RendezVousMedecinComponent } from './medecin/rendez-vous-medecin/rendez-vous-medecin.component';
import { DossierMedicalMedecinComponent } from './medecin/dossier-medical-medecin/dossier-medical-medecin.component';
import { NotificationMedecinComponent } from './medecin/notification-medecin/notification-medecin.component';
import { DocumentPatientComponent } from './patient/document-patient/document-patient.component';
import { DocumentMedecinComponent } from './medecin/document-medecin/document-medecin.component';
import { PaiementsPatientComponent } from './patient/paiements-patient/paiements-patient.component';

@NgModule({
  declarations: [
    AppComponent,
    LandingComponent,
    RegisterComponent,
    LoginComponent,
    ForgotPasswordComponent,
    VerifyOtpComponent,
    ResetPasswordComponent,
    SidebarPatientComponent,
    SidebarAdminComponent,
    SidebarMedecinComponent,
    RendezVousComponent,
    AddRendezVousComponent,
    ListMedecinComponent,
    ChatIaComponent,
    NotificationsComponent,
    ProfilComponent,
    DashboardComponent,
    DossierMedicalComponent,
    SpecialiteComponent,
    UtilisateurComponent,
    DashboardAdminComponent,
    RendezVousAdminComponent,
    PaiementAdminComponent,
    AddUtilisateurComponent,
    UnauthorizedComponent,
    DashboardMedecinComponent,
    PlageHoraireMedecinComponent,
    RendezVousMedecinComponent,
    DossierMedicalMedecinComponent,
    NotificationMedecinComponent,
    DocumentPatientComponent,
    DocumentMedecinComponent,
    PaiementsPatientComponent,
  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,
        ReactiveFormsModule,
        FormsModule,
    ],
  providers: [
    // 📦 Enregistrer le service d'authentification
    AuthService,

    // ⭐ Enregistrer l'intercepteur pour ajouter le token JWT automatiquement
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true  // Permet d'avoir plusieurs intercepteurs
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
