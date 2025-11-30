import { TestBed } from '@angular/core/testing';

import { DocumentMedicalService } from './document-medical.service';

describe('DocumentMedicalService', () => {
  let service: DocumentMedicalService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DocumentMedicalService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
