import { TestBed } from '@angular/core/testing';

import { Arquivo } from './arquivo';

describe('Arquivo', () => {
  let service: Arquivo;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Arquivo);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
