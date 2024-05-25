import { Component } from '@angular/core';
import { Person } from '../../models/person.model';
import { PersonComponent } from '../person/person.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-people',
  standalone: true,
  imports: [PersonComponent, CommonModule],
  templateUrl: './people.component.html',
  styleUrl: './people.component.css'
})
export class PeopleComponent {
  person: Person = new Person('John Felipe', 'Doe', 30, 75, 1.75);
  people: Person[] = [
    new Person('John', 'Doe', 30, 75, 1.75),
    new Person('Silvia', 'Pataquiva', 32, 54, 1.5),
    new Person('Santi', 'Molina', 12, 40, 1.5)
  ]
  selectedPerson: Person | undefined;

  onSelected(person: Person) {
    this.selectedPerson = person
  }
}
