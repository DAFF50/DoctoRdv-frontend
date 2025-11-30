import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RendezVousAdminComponent } from './rendez-vous-admin.component';

describe('RendezVousAdminComponent', () => {
  let component: RendezVousAdminComponent;
  let fixture: ComponentFixture<RendezVousAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RendezVousAdminComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RendezVousAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
