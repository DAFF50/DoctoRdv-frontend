import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumentMedecinComponent } from './document-medecin.component';

describe('DocumentMedecinComponent', () => {
  let component: DocumentMedecinComponent;
  let fixture: ComponentFixture<DocumentMedecinComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DocumentMedecinComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DocumentMedecinComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
