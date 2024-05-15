import { Injectable } from '@angular/core';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ValueService {


  private myValue = 'my value'

  constructor () { }

  setValue(value: string) {
    this.myValue = value
  }

  getValue() {
    return this.myValue
  }

  getPromiseValue() {
    return Promise.resolve('promise value')
  }

  getObservableValue() {
    return of('value')
  }
}
