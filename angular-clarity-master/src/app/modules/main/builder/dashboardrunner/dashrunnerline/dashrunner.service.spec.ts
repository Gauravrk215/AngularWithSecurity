import { TestBed } from '@angular/core/testing';

import { DashrunnerService } from './dashrunner.service';

describe('DashrunnerService', () => {
  let service: DashrunnerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DashrunnerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
