export class Person {
  constructor (
    public name: string,
    public lastName: string,
    public age: number,
    public weight: number,
    public height: number
  ) { }

  calculateIMC(): string {
    const imc = Math.round(this.weight / (this.height * this.height));

    if (imc === 0) {
      return 'Peso Indefinido';
    }

    if (imc < 18.5) {
      return 'Bajo Peso';
    } else if (imc >= 18.5 && imc <= 24.9) {
      return 'Peso Normal';
    } else if (imc >= 25 && imc <= 29.9) {
      return 'Sobre Peso';
    } else if (imc >= 30 && imc <= 39.9) {
      return 'Obesidad';
    } else {
      return 'Obesidad Extrema';
    }
  }
}
