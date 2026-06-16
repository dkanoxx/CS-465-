import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TripData } from '../services/trip-data';
import { Trip } from '../models/trip';

@Component({
  selector: 'app-trip-form',
  imports: [FormsModule],
  templateUrl: './trip-form.html',
  styleUrl: './trip-form.css'
})
export class TripForm {

  private tripService = inject(TripData);

  trip: Trip = {
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
    this.tripService.addTrip(this.trip).subscribe({
      next: () => {
        alert('Trip added successfully');
        window.location.reload();
      },
      error: (err) => {
        console.log(err);
        alert('Error adding trip. Check that all fields are completed and the trip code is unique.');
      }
    });
  }
}
