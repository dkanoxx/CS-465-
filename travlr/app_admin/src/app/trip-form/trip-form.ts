import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TripData } from '../services/trip-data';

@Component({
  selector: 'app-trip-form',
  imports: [FormsModule],
  templateUrl: './trip-form.html',
  styleUrl: './trip-form.css'
})
export class TripForm {

  private tripService = inject(TripData);

  trip:any = {
    code: '',
    name: '',
    length: '',
    start: '',
    resort: '',
    perPerson: '',
    image: 'images/reef1.jpg',
    description: ''
  };

  addTrip() {
    this.tripService.addTrip(this.trip).subscribe(() => {
      alert('Trip added successfully');
      window.location.reload();
    });
  }
}