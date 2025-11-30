import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../service/auth.service";
import {Utilisateur} from "../../models/utilisateur";
import {ActivatedRoute, Router} from "@angular/router";
import {UtilisateurService} from "../../service/utilisateur.service";
import {PlageHoraireService} from "../../service/plage-horaire.service";
import {PlagesParJour, PlageHoraire} from "../../models/plage-horaire";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {RendezVous} from "../../models/rendez-vous";
import {RendezVousService} from "../../service/rendez-vous.service";

@Component({
  selector: 'app-add-rendez-vous',
  templateUrl: './add-rendez-vous.component.html',
  styleUrl: './add-rendez-vous.component.css'
})
export class AddRendezVousComponent implements OnInit {

  formRendezVous: FormGroup = new FormGroup({
    motif: new FormControl('', [Validators.required, Validators.maxLength(255)]),
    dateRdv: new FormControl('', [Validators.required]),
    heure: new FormControl('', [Validators.required]),
    modePaiement: new FormControl('cabinet', [Validators.required]),
  });


  submitted = false;

  currentUser: Utilisateur | null = null;
  id!: number;
  medecin!: Utilisateur;
  plagesParJour: PlagesParJour = {};
  joursOrdonnes = ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi', 'Dimanche'];
  creneauxDisponibles: string[] = [];
  dateSelectionnee: string = '';

  constructor(
    private authService: AuthService,
    private plageHoraireService: PlageHoraireService,
    private utilisateurService: UtilisateurService,
    private rendezVousService: RendezVousService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.getUser();
    if (this.route.snapshot.params['id']) {
      this.id = this.route.snapshot.params['id'];
      this.getMedecinById(this.id);
    }
    this.chargerPlages();
  }

  getUser(): void {
    const currentUser = this.authService.getCurrentUser();

    if (currentUser) {
      this.currentUser = currentUser;
    } else {
      this.authService.me().subscribe({
        next: (user) => {
          this.currentUser = user;
        },
        error: (err) => console.error('Erreur :', err)
      });
    }
  }

  getMedecinById(id: number) {
    this.utilisateurService.getMedecinById(id).subscribe(
      (data: Utilisateur) => {
        this.medecin = data;
      },
      (error) => {
        console.log(error)
      }
    )
  }

  chargerPlages(): void {
    this.plageHoraireService.getPlagesByIdMedecin(this.id).subscribe({
      next: (data: any) => {
        // Les données arrivent avec un format {medecin_id: "4", plages: {lundi: [...], mardi: [...]}}
        this.plagesParJour = data.plages || data;
        console.log('Plages reçues :', this.plagesParJour);
      },
      error: (err) => console.error(err)
    });
  }

  // Méthode pour obtenir les plages d'un jour spécifique
  getPlagesForDay(jour: string): PlageHoraire[] {
    // Convertir le jour en minuscules pour correspondre aux clés des données
    const jourMinuscule = jour.toLowerCase();
    return this.plagesParJour[jourMinuscule] || [];
  }

  // Méthode pour formater les horaires d'un jour
  formatHorairesJour(jour: string): string {
    const plages = this.getPlagesForDay(jour);
    if (plages.length === 0) {
      return 'Fermé';
    }
    return plages.map(plage => {
      // Enlever les secondes si présentes
      const heureDebut = plage.heureDebut.substring(0, 5);
      const heureFin = plage.heureFin.substring(0, 5);
      return `${heureDebut} - ${heureFin}`;
    }).join('  ');
  }

  // Méthode pour vérifier si un jour est fermé
  isJourFerme(jour: string): boolean {
    return this.getPlagesForDay(jour).length === 0;
  }

  // Méthode appelée lors du changement de date
  onDateChange(event: any): void {
    this.dateSelectionnee = event.target.value;
    this.genererCreneaux();
  }

  // Méthode pour générer les créneaux de 30 minutes
  genererCreneaux(): void {
    this.creneauxDisponibles = [];

    if (!this.dateSelectionnee) {
      return;
    }

    // Obtenir le jour de la semaine à partir de la date sélectionnée
    const dateSelectionneeObj = new Date(this.dateSelectionnee + 'T00:00:00');
    const jourIndex = dateSelectionneeObj.getDay(); // 0 = Dimanche, 1 = Lundi, etc.

    // Convertir l'index en nom de jour en minuscules pour correspondre aux données
    const joursMap = ['dimanche', 'lundi', 'mardi', 'mercredi', 'jeudi', 'vendredi', 'samedi'];
    const jourSelectionne = joursMap[jourIndex];

    const plages = this.plagesParJour[jourSelectionne] || [];

    if (plages.length === 0) {
      return; // Pas de créneaux disponibles pour ce jour
    }

    // Obtenir la date et l'heure actuelle
    const maintenant = new Date();

    // Vérifier si la date sélectionnée est dans le passé
    const dateSelectionneeDebut = new Date(this.dateSelectionnee + 'T00:00:00');
    const aujourdhuiDebut = new Date(maintenant.getFullYear(), maintenant.getMonth(), maintenant.getDate());

    // Si la date est dans le passé, ne pas afficher de créneaux
    if (dateSelectionneeDebut < aujourdhuiDebut) {
      return;
    }

    const estAujourdhui = dateSelectionneeDebut.getTime() === aujourdhuiDebut.getTime();

    // Pour chaque plage horaire
    plages.forEach((plage: any) => {
      const creneaux = this.genererCreneauxPourPlage(plage.heureDebut, plage.heureFin);

      // Si c'est aujourd'hui, filtrer les créneaux passés
      if (estAujourdhui) {
        const heureActuelle = maintenant.getHours();
        const minuteActuelle = maintenant.getMinutes();
        const minutesActuelles = heureActuelle * 60 + minuteActuelle;

        const creneauxFuturs = creneaux.filter(creneau => {
          // Extraire l'heure de début du créneau (format "HH:MM")
          const [h, m] = creneau.split(':').map(Number);
          const minutesCreneau = h * 60 + m;

          // Garder seulement les créneaux futurs
          return minutesCreneau > minutesActuelles;
        });

        this.creneauxDisponibles.push(...creneauxFuturs);
      } else {
        // Si c'est un jour futur, ajouter tous les créneaux
        this.creneauxDisponibles.push(...creneaux);
      }
    });
  }

  // Méthode pour générer des créneaux de 30 minutes entre deux heures
  genererCreneauxPourPlage(heureDebut: string, heureFin: string): string[] {
    const creneaux: string[] = [];

    // Convertir les heures en minutes (en ignorant les secondes si présentes)
    const [heureD, minuteD] = heureDebut.split(':').map(Number);
    const [heureF, minuteF] = heureFin.split(':').map(Number);

    let minutesDebut = heureD * 60 + minuteD;
    const minutesFin = heureF * 60 + minuteF;

    // Générer les créneaux de 30 minutes
    while (minutesDebut < minutesFin) {
      const heureActuelle = Math.floor(minutesDebut / 60);
      const minuteActuelle = minutesDebut % 60;

      const creneauDebut = `${heureActuelle.toString().padStart(2, '0')}:${minuteActuelle.toString().padStart(2, '0')}`;

      creneaux.push(creneauDebut);

      minutesDebut += 30;
    }

    return creneaux;
  }

  get f2() {
    return this.formRendezVous.controls;
  }

  onSubmit() {
    this.submitted = true;
    if (this.formRendezVous.invalid) {
      // Scroll vers la première erreur
      this.scrollToFirstError();
      return;
    }

    if (!this.medecin?.id) {
      console.error('Médecin non chargé');
      return;
    }

    if (!this.currentUser?.id) {
      console.error('patient non chargé');
      return;
    }

    const formValue = this.formRendezVous.value;
    const rendezVous: RendezVous = {
      matricule: "rdv-" + String(this.currentUser.id) + "-" + String(this.medecin.id) + "-" + formValue.dateRdv + "-" +  formValue.heure,
      dateRdv: formValue.dateRdv,
      heure: formValue.heure,
      statut: 'confirme',
      motif: formValue.motif,
      modePaiement: formValue.modePaiement,
      montant: this.medecin.specialite?.tarif,
      cheminJustificatifPdf: formValue.cheminJustificatifPdf,
      medecin_id: this.medecin.id,
      patient_id: this.currentUser.id,
    };
    console.log(rendezVous);

    this.rendezVousService.save(rendezVous).subscribe(
      () => {
        this.router.navigateByUrl('/patient/rendez-vous');
        this.formRendezVous.reset();
        this.submitted = false;
      },
      (error) => {
        console.log(error);
      }
    )
  }

  scrollToFirstError(): void {
    setTimeout(() => {
      const firstError = document.querySelector('.text-danger');
      if (firstError) {
        firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }, 100);
  }

  selectHeure(creneau: string): void {
    this.formRendezVous.patchValue({ heure: creneau });
  }

  isCreneauSelected(creneau: string): boolean {
    return this.formRendezVous.get('heure')?.value === creneau;
  }
}
