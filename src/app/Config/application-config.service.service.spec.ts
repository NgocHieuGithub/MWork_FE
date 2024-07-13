import { TestBed } from '@angular/core/testing';

import { ApplicationConfigServiceService } from './application-config.service.service';

describe('ApplicationConfigServiceService', () => {
  let service: ApplicationConfigServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApplicationConfigServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
