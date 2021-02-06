import { TestBed } from '@angular/core/testing';

import { LoginFitbitService } from './login-fitbit.service';

describe('LoginFitbitService', () => {
  let service: LoginFitbitService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LoginFitbitService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
