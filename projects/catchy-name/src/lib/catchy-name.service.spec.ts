import { TestBed } from '@angular/core/testing';

import { CatchyNameService } from './catchy-name.service';

describe('CatchyNameService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CatchyNameService = TestBed.get(CatchyNameService);
    expect(service).toBeTruthy();
  });
});
