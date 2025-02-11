import { TestBed } from '@angular/core/testing';

import { CircuitsServiceService } from './circuits.service';

describe('CircuitsServiceService', () => {
  let service: CircuitsServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CircuitsServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
