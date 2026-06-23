import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
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
  @Output() tripUpdated = new EventEmitter<void>();
  @Output() tripDeleted = new EventEmitter<void>();

  editing = false;
  editTrip!: Trip;

  private tripService = inject(TripData);

  startEdit(): void {
    this.editTrip = { ...this.trip };
    this.editing = true;
  }

  cancelEdit(): void {
    this.editing = false;
  }

  save(): void {
    this.tripService.updateTrip(this.trip.code, this.editTrip).subscribe({
      next: (updatedTrip: Trip) => {
        Object.assign(this.trip, updatedTrip);
        this.editing = false;
        this.tripUpdated.emit();
        alert('Trip updated successfully');
      },
      error: (err) => {
        console.log(err);
        alert('Error updating trip. Make sure you are logged in and the trip code is valid.');
      }
    });
  }

  deleteTrip(): void {
    if (confirm(`Delete trip ${this.trip.name}?`)) {
      this.tripService.deleteTrip(this.trip.code).subscribe({
        next: () => {
          this.tripDeleted.emit();
          alert('Trip deleted successfully');
        },
        error: (err) => {
          console.log(err);
          alert('Error deleting trip. Make sure you are logged in.');
        }
      });
    }
  }
}
