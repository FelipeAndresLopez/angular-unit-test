import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PeopleComponent } from './people.component';
import { PersonComponent } from '../person/person.component';
import { Person } from '../../models/person.model';
import { By } from '@angular/platform-browser';

fdescribe('PeopleComponent', () => {
  let component: PeopleComponent;
  let fixture: ComponentFixture<PeopleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PeopleComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(PeopleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have a list of app-person components', () => {
    component.people = [
      new Person('John', 'Doe', 30, 75, 1.75),
      new Person('Silvia', 'Pataquiva', 32, 54, 1.5),
      new Person('Santi', 'Molina', 12, 40, 1.5)
    ]

    fixture.detectChanges()

    const personComponents = fixture.debugElement.queryAll(By.css('app-person'))
    expect(personComponents.length).toBe(3)

  })

  fit('should display selected person', () => {
    const personComponent = fixture.debugElement.query(By.css('app-person .btn-choose'));
    personComponent.triggerEventHandler('click', null);
    fixture.detectChanges()
    const personSelectedLabel = fixture.debugElement.query(By.css('div ul > li')).nativeElement.textContent;
    expect(component.selectedPerson?.name).toContain(personSelectedLabel)
  })
});
