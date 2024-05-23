import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonComponent } from './person.component';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { Person } from '../../models/person.model';

fdescribe('PersonComponent', () => {
  let component: PersonComponent;
  let fixture: ComponentFixture<PersonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PersonComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(PersonComponent);
    component = fixture.componentInstance;
    component.person = new Person('John', 'Doe', 30, 75, 1.75);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should the name be John', () => {
    expect(component.person.name).toEqual('John');
  })

  it('should have <h2> with text "Hola {person.name}"', () => {
    const h2 = fixture.nativeElement.querySelector('h2');
    const expectedMsg = `Hola ${component.person.name}`;
    expect(h2.textContent).toEqual(expectedMsg);
  })

  // la diferencia entre nativeElement y debugElement
  // es que debugElement se puede usar en ambientes
  // que no necesariamente son browsers, como
  // server side rendering
  it('should have <h2> with text "Hola {person.name}" using debugElement', () => {
    const personDebug: DebugElement = fixture.debugElement
    const personElement: HTMLElement = personDebug.nativeElement.querySelector('h2');
    expect(personElement.textContent).toContain(component.person.name);
  })

  it('should have <p> with text "Mi altura: {person.height}" using debugElement y By.css', () => {
    const personDebug: DebugElement = fixture.debugElement
    const pDebug: DebugElement = personDebug.query(By.css('p'))
    const pElement: HTMLElement = pDebug.nativeElement
    expect(pElement.textContent).toContain(component.person.height);
  })

  it('should display IMC after call calculateIMC', () => {

    // Arrange
    component.person = new Person('Silvia', 'Pataquiva', 32, 54, 1.5)
    const expectedMsg = 'Peso Normal'
    const button = fixture.debugElement.query(By.css('button.btn-imc')).nativeElement

    // Act
    component.calculateIMC()
    fixture.detectChanges();

    // Assert
    expect(button.textContent).toContain(expectedMsg)
  })

  it('should display IMC after click on IMC button', () => {

    // Arrange
    component.person = new Person('Silvia', 'Pataquiva', 32, 54, 1.5)
    const expectedMsg = 'Peso Normal'
    const btnDebugElement = fixture.debugElement.query(By.css('button.btn-imc'))
    const btnElement = btnDebugElement.nativeElement

    // Act
    btnDebugElement.triggerEventHandler('click', null)
    fixture.detectChanges();

    // Assert
    expect(btnElement.textContent).toContain(expectedMsg)
  })
});
