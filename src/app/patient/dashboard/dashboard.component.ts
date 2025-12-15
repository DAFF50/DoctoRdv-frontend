import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../service/auth.service";
import {Utilisateur} from "../../models/utilisateur";
import {DossierMedicalStatsPatient, RendezVousStatsPatient, Statistique} from "../../models/statistique";
import {UtilisateurService} from "../../service/utilisateur.service";
import {RendezVous} from "../../models/rendez-vous";


@Component({
  selector: 'app-dashboard-admin',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {

  userConnected!: Utilisateur;
  currentDate: string = '';
  statsRdv!: RendezVousStatsPatient;
  statsDossierMedicaux!: DossierMedicalStatsPatient;
  prochainRdv?: RendezVous;

  constructor(private authService: AuthService, private utilisateurService: UtilisateurService) {
  }

  ngOnInit() {
    this.getUser();
    this.currentDate = this.getTodayFormattedDate();
    this.getStatsPatient();
  }

  getUser(): void {
    const currentUser = this.authService.getCurrentUser();

    if (currentUser) {
      this.userConnected = currentUser;
    } else {
      this.authService.me().subscribe({
        next: (user) => {
          this.userConnected = user;
        },
        error: (err) => console.error('Erreur recuperation user :', err)
      });
    }
  }

  getStatsPatient() {
    this.utilisateurService.getStatsPatient().subscribe(
      (data: Statistique) => {
        this.statsRdv = data.rendezVous;
        this.statsDossierMedicaux = data.dossierMedicaux;
        this.prochainRdv = data.prochainRdv;
        console.log(this.statsRdv);
      },
      (error) => {
        console.log(error);
      }
    )
  }



  getTodayFormattedDate(): string {
    const date = new Date();

    const options: Intl.DateTimeFormatOptions = {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    };

    // Date formatée en français
    const formatted = date.toLocaleDateString('fr-FR', options);

    // Capitaliser les premières lettres du jour et du mois
    const capitalize = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

    // Exemple obtenu : "lundi 20 octobre 2025"
    const parts = formatted.split(' ');
    const weekday = capitalize(parts[0]);
    const day = parts[1];
    const month = capitalize(parts[2]);
    const year = parts[3];

    return `📅 ${weekday} ${day} ${month} ${year}`;
  }

  getRdvDay(rdvDate: string | Date): string {
    const date = new Date(rdvDate);
    return date.getDate().toString().padStart(2, '0'); // jour sur 2 chiffres
  }

  getRdvMonth(rdvDate: string | Date): string {
    const date = new Date(rdvDate);
    const months = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];
    return months[date.getMonth()];
  }

  getRdvFormattedDate(rdvDate: string | Date): string {
    const date = new Date(rdvDate);

    const options: Intl.DateTimeFormatOptions = {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    };

    // Date formatée en français
    const formatted = date.toLocaleDateString('fr-FR', options);

    // Capitaliser le jour et le mois
    return formatted.replace(/\b\w/g, (c) => c.toUpperCase());
  }

  getRdvFormattedTime(heure: string): string {
    if (!heure) return '';
    const [hours, minutes] = heure.split(':');
    return `${hours.padStart(2, '0')}:${minutes.padStart(2, '0')}`;
  }


}
