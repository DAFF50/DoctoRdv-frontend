import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RendezVousMedecinComponent } from './rendez-vous-medecin.component';

describe('RendezVousMedecinComponent', () => {
  let component: RendezVousMedecinComponent;
  let fixture: ComponentFixture<RendezVousMedecinComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RendezVousMedecinComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RendezVousMedecinComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
