import { Component, Input, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TripData } from '../services/trip-data';
import { Trip } from '../models/trip';

@Component({
  selector: 'app-trip-card',
  imports: [FormsModule],
  templateUrl: './trip-card.html',
  styleUrl: './trip-card.css'
})
export class TripCard {

  @Input() trip!: Trip;

  editing = false;
  editTrip!: Trip;

  private tripService = inject(TripData);

  startEdit() {
    this.editTrip = { ...this.trip };
    this.editing = true;
  }

  cancelEdit() {
    this.editing = false;
  }

  save() {
    this.tripService.updateTrip(this.trip.code, this.editTrip).subscribe({
      next: (updatedTrip: Trip) => {
        Object.assign(this.trip, updatedTrip);
        this.editing = false;
        alert('Trip updated successfully');
      },
      error: (err) => {
        console.log(err);
        alert('Error updating trip');
      }
    });
  }

  deleteTrip() {
    if (confirm(`Delete trip ${this.trip.name}?`)) {
      this.tripService.deleteTrip(this.trip.code).subscribe({
        next: () => {
          alert('Trip deleted successfully');
          window.location.reload();
        },
        error: (err) => {
          console.log(err);
          alert('Error deleting trip');
        }
      });
    }
  }
}
