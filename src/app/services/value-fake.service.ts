
export class ValueFakeService {


  constructor () { }

  setValue(value: string) { }

  getValue() {
    return 'fake value'
  }

  getPromiseValue() {
    return Promise.resolve('promise value')
  }
}
