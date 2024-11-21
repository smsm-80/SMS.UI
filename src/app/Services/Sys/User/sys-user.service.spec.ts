import { TestBed } from '@angular/core/testing';

import { SysUserService } from './sys-user.service';

describe('SysUserService', () => {
  let service: SysUserService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SysUserService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
