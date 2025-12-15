import { Component, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { AuthService } from "../../service/auth.service";

@Component({
  selector: 'app-sidebar-patient',
  templateUrl: './sidebar-patient.component.html',
  styleUrls: ['./sidebar-patient.component.css']
})
export class SidebarPatientComponent implements AfterViewInit {

  @ViewChild('sidebar') sidebarRef!: ElementRef;
  isSidebarClosed = false;

  constructor(private router: Router, private authService: AuthService) {
    // Écoute les changements de route pour mettre à jour l'état actif
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      this.updateActiveLink();
    });
  }

  ngAfterViewInit(): void {
    const sidebar = this.sidebarRef.nativeElement;
    const searchBtn = sidebar.querySelector(".search-box") as HTMLElement;
    const modeSwitch = sidebar.querySelector(".toggle-switch") as HTMLElement;
    const modeText = sidebar.querySelector(".mode-text") as HTMLElement;

    searchBtn.addEventListener("click", () => {
      this.isSidebarClosed = false;
    });

    modeSwitch.addEventListener("click", () => {
      document.body.classList.toggle("dark");
      modeText.innerText = document.body.classList.contains("dark") ? "Light mode" : "Dark mode";
    });

    // Initialiser l'état actif au chargement
    this.updateActiveLink();
  }

  updateActiveLink(): void {
    const sidebar = this.sidebarRef.nativeElement;
    const links = sidebar.querySelectorAll('.nav-link a');
    const currentUrl = this.router.url;

    links.forEach((link: HTMLElement) => {
      const href = link.getAttribute('routerLink');
      if (href && currentUrl.includes(href)) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });
  }

  onLogout(): void {
    this.authService.logout();
  }

  toggleSidebar(): void {
    this.isSidebarClosed = !this.isSidebarClosed;
  }
}
