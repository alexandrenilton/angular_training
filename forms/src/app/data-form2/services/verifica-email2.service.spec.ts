import { TestBed, inject } from '@angular/core/testing';

import { VerificaEmailService2 } from './verifica-email2.service';

describe('VerificaEmailService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [VerificaEmailService2]
    });
  });

  it('should be created', inject([VerificaEmailService2], (service: VerificaEmailService2) => {
    expect(service).toBeTruthy();
  }));
});
