import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TripCard } from '../trip-card/trip-card';
import { TripData } from '../services/trip-data';

@Component({
  selector: 'app-trip-list',
  imports: [CommonModule, TripCard],
  templateUrl: './trip-list.html',
  styleUrl: './trip-list.css'
})
export class TripList {
  trips: any[] = [];
  errorMessage = '';

  private tripService = inject(TripData);

  ngOnInit() {
    this.tripService.getTrips().subscribe({
      next: (data: any) => {
        this.trips = data;
      },
      error: (err) => {
        this.errorMessage = err.message;
        console.log(err);
      }
    });
  }
}