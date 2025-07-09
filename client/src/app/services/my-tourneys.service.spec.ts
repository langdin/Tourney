import { TestBed } from '@angular/core/testing';

import { MyTourneysService } from './my-tourneys.service';

describe('MyTourneysService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MyTourneysService = TestBed.get(MyTourneysService);
    expect(service).toBeTruthy();
  });
});
