import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumentPatientComponent } from './document-patient.component';

describe('DocumentPatientComponent', () => {
  let component: DocumentPatientComponent;
  let fixture: ComponentFixture<DocumentPatientComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DocumentPatientComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DocumentPatientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
