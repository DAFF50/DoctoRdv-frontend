import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaiementsPatientComponent } from './paiements-patient.component';

describe('PaiementsPatientComponent', () => {
  let component: PaiementsPatientComponent;
  let fixture: ComponentFixture<PaiementsPatientComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PaiementsPatientComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PaiementsPatientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
