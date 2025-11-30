import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlageHoraireMedecinComponent } from './plage-horaire-medecin.component';

describe('PlageHoraireMedecinComponent', () => {
  let component: PlageHoraireMedecinComponent;
  let fixture: ComponentFixture<PlageHoraireMedecinComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PlageHoraireMedecinComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PlageHoraireMedecinComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
