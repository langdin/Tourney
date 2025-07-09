import { TestBed } from '@angular/core/testing';

import { BoutService } from './bout.service';

describe('BoutService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: BoutService = TestBed.get(BoutService);
    expect(service).toBeTruthy();
  });
});
