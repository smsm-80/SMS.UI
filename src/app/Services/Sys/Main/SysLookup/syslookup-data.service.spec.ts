import { TestBed } from '@angular/core/testing';

import { SyslookupDataService } from './syslookup-data.service';

describe('SyslookupDataService', () => {
  let service: SyslookupDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SyslookupDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
