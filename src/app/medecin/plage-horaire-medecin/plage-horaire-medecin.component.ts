import {Component, OnInit} from '@angular/core';
import {PlageHoraire, PlagesParJour} from "../../models/plage-horaire";
import {PlageHoraireService} from "../../service/plage-horaire.service";
import {AuthService} from "../../service/auth.service";

@Component({
  selector: 'app-plage-horaire-medecin',
  templateUrl: './plage-horaire-medecin.component.html',
  styleUrls: ['./plage-horaire-medecin.component.css']
})
export class PlageHoraireMedecinComponent implements OnInit {

  medecinId?: number;
  jours = ['lundi', 'mardi', 'mercredi', 'jeudi', 'vendredi', 'samedi'];
  plagesParJour: PlagesParJour = {};
  isLoading = false;

  constructor(
    private plageService: PlageHoraireService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    const user = this.authService.getUser();
    this.medecinId = user?.id;
    this.loadPlages();
  }

  loadPlages(): void {
    this.isLoading = true;
    this.plageService.getMesPlages().subscribe({
      next: data => {
        this.plagesParJour = data;
        // Initialiser les jours sans plage
        this.jours.forEach(jour => {
          if (!this.plagesParJour[jour]) this.plagesParJour[jour] = [];
        });
        this.isLoading = false;
      },
      error: error => {
        console.error('Erreur chargement plages:', error);
        this.isLoading = false;
        alert('❌ Erreur lors du chargement des plages');
      }
    });
  }

  addPlage(jour: string): void {
    const plages = this.plagesParJour[jour] || [];
    if (plages.length >= 2) return alert('⚠️ Maximum 2 plages par jour');

    plages.push({
      id: Date.now(), // id temporaire Angular
      jour,
      heureDebut: '09:00',
      heureFin: '17:00',
      estActive: true
    });

    this.plagesParJour[jour] = plages;
  }

  deletePlage(jour: string, index: number, plageId?: number): void {
    if (!confirm('⚠️ Supprimer cette plage ?')) return;

    // 1️⃣ Supprime immédiatement la ligne localement
    this.plagesParJour[jour].splice(index, 1);

    // 2️⃣ Si la plage existe en base, on envoie la requête DELETE
    if (plageId) {
      this.plageService.deletePlage(plageId).subscribe({
        next: () => {
          // Rien à faire, la ligne est déjà supprimée
        },
        error: (err) => {
          if (err.status !== 404 ) {
            alert('❌ Erreur lors de la suppression');
          }

        }
      });
    }
  }


  togglePlage(jour: string, index: number): void {
    const plage = this.plagesParJour[jour][index];

    if (!plage.id) {
      // Nouvelle plage non sauvegardée → juste toggle local
      plage.estActive = !plage.estActive;
      return;
    }

    this.plageService.togglePlage(plage.id).subscribe({
      next: (plageMiseAJour) => {
        this.plagesParJour[jour][index] = plageMiseAJour;
      },
      error: (err) => {
        console.error('Erreur toggle plage:', err);
        alert('❌ Impossible de changer le statut');
      }
    });
  }


  savePlages(): void {
    const plagesArray: PlageHoraire[] = [];

    const formatHHMM = (time: string): string => {
      if (!time) return '00:00';
      const [h, m] = time.split(':');
      return `${h.padStart(2, '0')}:${m.padStart(2, '0')}`;
    };

    // ✅ Parcours des plages par jour
    for (const jour of Object.keys(this.plagesParJour)) {
      const plages = this.plagesParJour[jour];

      // 1️⃣ Vérifier heureDebut < heureFin
      for (const p of plages) {
        if (p.heureDebut >= p.heureFin) {
          alert(`⚠️ Pour le ${jour}, l'heure de début (${p.heureDebut}) doit être inférieure à l'heure de fin (${p.heureFin})`);
          return;
        }
      }

      // 2️⃣ Vérifier chevauchements entre plages du même jour
      for (let i = 0; i < plages.length; i++) {
        for (let j = i + 1; j < plages.length; j++) {
          const p1 = plages[i];
          const p2 = plages[j];
          // condition de chevauchement : début d'une < fin de l'autre ET fin d'une > début de l'autre
          if (p1.heureDebut < p2.heureFin && p1.heureFin > p2.heureDebut) {
            alert(`⚠️ Les plages du ${jour} (${p1.heureDebut}-${p1.heureFin}) et (${p2.heureDebut}-${p2.heureFin}) se chevauchent`);
            return;
          }
        }
      }

      // ✅ Si tout est bon, on prépare pour l’enregistrement
      plages.forEach(plage => {
        plagesArray.push({
          jour,
          heureDebut: formatHHMM(plage.heureDebut),
          heureFin: formatHHMM(plage.heureFin),
          estActive: plage.estActive
        });
      });
    }

    if (plagesArray.length === 0) {
      alert('⚠️ Aucune plage à enregistrer');
      return;
    }

    this.isLoading = true;

    // ✅ Enregistrement si tout est valide
    this.plageService.savePlages(plagesArray).subscribe({
      next: () => {
        alert('✅ Plages enregistrées avec succès');
        this.loadPlages();
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Erreur enregistrement:', error.error);
        alert('❌ Erreur lors de l\'enregistrement');
        this.isLoading = false;
      }
    });
  }

  hasPlages(jour: string): boolean {
    return this.plagesParJour[jour] && this.plagesParJour[jour].length > 0;
  }

  canAddPlage(jour: string): boolean {
    return (this.plagesParJour[jour]?.length || 0) < 2;
  }

  cancel(): void {
    if (confirm('⚠️ Annuler les modifications non enregistrées ?')) {
      this.loadPlages();
    }
  }
}
