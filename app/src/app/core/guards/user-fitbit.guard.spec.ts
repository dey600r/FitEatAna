import { TestBed } from '@angular/core/testing';

import { UserFitbitGuard } from './user-fitbit.guard';

describe('UserFitbitGuard', () => {
  let guard: UserFitbitGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(UserFitbitGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
