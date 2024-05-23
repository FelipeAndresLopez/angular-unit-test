import { TestBed } from "@angular/core/testing";
import { Person } from "./person.model";


describe('tests for Person', () => {
  let person: Person

  beforeEach(() => {
    person = new Person('John', 'Doe', 30, 75, 1.75)
  })

  it('attributes should be defined', () => {
    expect(person.name).toEqual('John');
    expect(person.lastName).toEqual('Doe');
    expect(person.age).toEqual(30);
    expect(person.weight).toEqual(75);
    expect(person.height).toEqual(1.75);
  })

  describe('tests for calculateIMC', () => {
    it('should calculate IMC', () => {
      // Arrange
      person.weight = 45
      person.height = 1.5
      // Act
      const imc = person.calculateIMC();
      // Assert
      expect(imc).toEqual('Peso Normal');
    });

  });

});
