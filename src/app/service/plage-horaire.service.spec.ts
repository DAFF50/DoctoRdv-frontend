import { TestBed } from '@angular/core/testing';

import { PlageHoraireService } from './plage-horaire.service';

describe('PlageHoraireService', () => {
  let service: PlageHoraireService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PlageHoraireService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
