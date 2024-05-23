import { Component } from '@angular/core';
import { Person } from '../../models/person.model';
import { PersonComponent } from '../person/person.component';

@Component({
  selector: 'app-people',
  standalone: true,
  imports: [PersonComponent],
  templateUrl: './people.component.html',
  styleUrl: './people.component.css'
})
export class PeopleComponent {
  person: Person = new Person('John Felipe', 'Doe', 30, 75, 1.75);
}
