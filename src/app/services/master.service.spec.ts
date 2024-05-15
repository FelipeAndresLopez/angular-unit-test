import { inject } from '@angular/core';
import { MasterService } from './master.service';
import { ValueService } from './value.service';
import { ValueFakeService } from './value-fake.service';
import { TestBed } from '@angular/core/testing';

describe('MasterService', () => {

  let masterService: MasterService;
  let valueService: jasmine.SpyObj<ValueService>

  beforeEach(() => {
    const valueServiceSpy = jasmine.createSpyObj('ValueService', ['getValue']);
    TestBed.configureTestingModule({
      providers: [
        MasterService,
        { provide: ValueService, useValue: valueServiceSpy }
      ]
    })

    masterService = TestBed.inject(MasterService)
    valueService = TestBed.inject(ValueService) as jasmine.SpyObj<ValueService>

  })


  xit('should return "my value" from value service', () => {
    const valueService = new ValueService();
    const masterService = new MasterService(valueService);
    expect(masterService.getValue()).toEqual('my value');
  })

  xit('should return "my value" from fake service', () => {
    const valueFakeService = new ValueFakeService();
    const masterService = new MasterService(valueFakeService as unknown as ValueService);
    expect(masterService.getValue()).toEqual('fake value');
  })


  xit('should return "my value" from fake object', () => {
    const fakeObject = {
      getValue: () => 'fake from object'
    }
    const masterService = new MasterService(fakeObject as ValueService);
    expect(masterService.getValue()).toEqual('fake from object');
  })

  it('should call to getValue from valueService', () => {
    valueService.getValue.and.returnValue('fake from spy');
    expect(masterService.getValue()).toEqual('fake from spy');
    expect(valueService.getValue).toHaveBeenCalledTimes(1);

  })


});
