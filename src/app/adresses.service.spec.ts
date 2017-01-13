/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { AdressesService } from './adresses.service';

describe('AdressesService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AdressesService]
    });
  });

  it('should ...', inject([AdressesService], (service: AdressesService) => {
    expect(service).toBeTruthy();
  }));
});
