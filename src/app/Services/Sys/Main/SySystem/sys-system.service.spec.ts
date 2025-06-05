import { TestBed } from '@angular/core/testing';

import { SysSystemService } from './sys-system.service';

describe('SysSystemService', () => {
  let service: SysSystemService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SysSystemService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
