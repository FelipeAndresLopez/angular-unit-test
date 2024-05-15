import { TestBed } from '@angular/core/testing';
import { ValueService } from './value.service';

describe('ValueService', () => {
  let service: ValueService;


  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ValueService]
    });
    service = TestBed.inject(ValueService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('setValue', () => {
    it('should set the value', () => {
      expect(service.getValue()).toEqual('my value');
      service.setValue('value');
      expect(service.getValue()).toEqual('value');
    })
  });

  describe('getValue', () => {
    it('should return "my value"', () => {
      expect(service.getValue()).toEqual('my value');
    })
  });

  describe('Tests for getPromiseValue', () => {
    it('should return "promise value"', (doneFn) => {
      service.getPromiseValue().then((value) => {
        expect(value).toEqual('promise value');
      })
      doneFn();
    })
  });

  describe('Tests for getObservableValue', () => {
    it('should return "observable value"', () => {
      service.getObservableValue().subscribe(
        (value) => expect(value).toEqual('value')
      )
    })
  })
});
