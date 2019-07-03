import { TestBed } from '@angular/core/testing';

import { TokenhandlerService } from './tokenhandler.service';

describe('TokenhandlerService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TokenhandlerService = TestBed.get(TokenhandlerService);
    expect(service).toBeTruthy();
  });
});
