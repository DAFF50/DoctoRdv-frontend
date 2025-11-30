import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DossierMedicalMedecinComponent } from './dossier-medical-medecin.component';

describe('DossierMedicalMedecinComponent', () => {
  let component: DossierMedicalMedecinComponent;
  let fixture: ComponentFixture<DossierMedicalMedecinComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DossierMedicalMedecinComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DossierMedicalMedecinComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
