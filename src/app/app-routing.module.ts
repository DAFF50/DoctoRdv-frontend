import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingComponent } from "./landing/landing.component";
import { RegisterComponent } from "./patient/register/register.component";
import { LoginComponent } from "./login/login.component";
import { ForgotPasswordComponent } from "./forgot-password/forgot-password.component";
import { VerifyOtpComponent } from "./verify-otp/verify-otp.component";
import { ResetPasswordComponent } from "./reset-password/reset-password.component";
import { SidebarPatientComponent } from "./patient/sidebar-patient/sidebar-patient.component";
import { SidebarMedecinComponent } from "./medecin/sidebar-medecin/sidebar-medecin.component";
import { SidebarAdminComponent } from "./admin/sidebar-admin/sidebar-admin.component";
import { RendezVousComponent } from "./patient/rendez-vous/rendez-vous.component";
import { AddRendezVousComponent } from "./patient/rendez-vous/add-rendez-vous.component";
import { ListMedecinComponent } from "./patient/rendez-vous/list-medecin.component";
import { ChatIaComponent } from "./patient/chat-ia/chat-ia.component";
import { NotificationsComponent } from "./patient/notifications/notifications.component";
import { ProfilComponent } from "./patient/profil/profil.component";
import { DashboardComponent } from "./patient/dashboard/dashboard.component";
import { DossierMedicalComponent } from "./patient/dossier-medical/dossier-medical.component";
import { SpecialiteComponent } from "./admin/specialite/specialite.component";
import { UtilisateurComponent } from "./admin/utilisateur/utilisateur.component";
import { DashboardAdminComponent } from "./admin/dashboard-admin/dashboard-admin.component";
import { RendezVousAdminComponent } from "./admin/rendez-vous-admin/rendez-vous-admin.component";
import { PaiementAdminComponent } from "./admin/paiement-admin/paiement-admin.component";
import { AddUtilisateurComponent } from "./admin/utilisateur/add-utilisateur.component";

// ⭐ Importer le guard
import { AuthGuard } from "./guards/auth.guard";
import {UnauthorizedComponent} from "./unauthorized/unauthorized.component";
import {DashboardMedecinComponent} from "./medecin/dashboard-medecin/dashboard-medecin.component";
import {PlageHoraireMedecinComponent} from "./medecin/plage-horaire-medecin/plage-horaire-medecin.component";
import {RendezVousMedecinComponent} from "./medecin/rendez-vous-medecin/rendez-vous-medecin.component";
import {DossierMedicalMedecinComponent} from "./medecin/dossier-medical-medecin/dossier-medical-medecin.component";
import {NotificationMedecinComponent} from "./medecin/notification-medecin/notification-medecin.component";
import {DocumentPatientComponent} from "./patient/document-patient/document-patient.component";
import {DocumentMedecinComponent} from "./medecin/document-medecin/document-medecin.component";

const routes: Routes = [
  {path: '', component: LandingComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'login', component: LoginComponent},
  {path: 'mot-de-passe-oublie', component: ForgotPasswordComponent},
  {path: 'verification-otp', component: VerifyOtpComponent},
  {path: 'reinitialiser-mot-de-passe', component: ResetPasswordComponent},
  { path: 'unauthorized', component: UnauthorizedComponent },

  // 🔒 Routes Patient protégées
  {
    path: 'patient',
    component: SidebarPatientComponent,
    canActivate: [AuthGuard],  // ⭐ Protection ajoutée
    data: { role: 'patient' },  // ⭐ Rôle requis
    children : [
      {path: 'rendez-vous', component: RendezVousComponent},
      {path: 'add-rendez-vous/:id', component: AddRendezVousComponent},
      {path: 'list-medecin', component: ListMedecinComponent},
      {path: 'chat-ia', component: ChatIaComponent},
      {path: 'notifications', component: NotificationsComponent},
      {path: 'profil', component: ProfilComponent},
      {path: 'dashboard', component: DashboardComponent},
      {path: 'dossier-medical', component: DossierMedicalComponent},
      {path: 'document-patient/:id', component: DocumentPatientComponent},
      {path: '', component: DashboardComponent},
    ]
  },

  // 🔒 Routes Médecin protégées
  {
    path: 'medecin',
    component: SidebarMedecinComponent,
    canActivate: [AuthGuard],  // ⭐ Protection ajoutée
    data: { role: 'medecin' },  // ⭐ Rôle requis
    children: [
      {path: 'dashboard', component: DashboardMedecinComponent},
      {path: 'plage-horaire', component: PlageHoraireMedecinComponent},
      {path: 'rendez-vous', component: RendezVousMedecinComponent},
      {path: 'dossier-medical', component: DossierMedicalMedecinComponent},
      {path: 'notification', component: NotificationMedecinComponent},
      {path: 'dossier-medical/:id', component: DocumentMedecinComponent},
    ]
  },

  // 🔒 Routes Admin protégées
  {
    path: 'admin',
    component: SidebarAdminComponent,
    canActivate: [AuthGuard],  // ⭐ Protection ajoutée
    data: { role: 'admin' },    // ⭐ Rôle requis
    children :[
      {path: 'specialite', component: SpecialiteComponent},
      {path: 'utilisateur', component: UtilisateurComponent},
      {path: 'add-utilisateur', component: AddUtilisateurComponent},
      {path: 'update-utilisateur/:id', component: AddUtilisateurComponent},
      {path: 'dashboard', component: DashboardAdminComponent},
      {path: 'rendez-vous', component: RendezVousAdminComponent},
      {path: 'paiement', component: PaiementAdminComponent},
    ]
  },

  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
