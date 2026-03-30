import { TestBed } from '@angular/core/testing';

import { VatSourceService } from './vat-source.service';

describe('VatSourceService', () => {
  let service: VatSourceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VatSourceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
