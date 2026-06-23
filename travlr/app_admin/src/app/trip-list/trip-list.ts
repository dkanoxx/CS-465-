import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TripData } from '../services/trip-data';
import { TripCard } from '../trip-card/trip-card';
import { Trip } from '../models/trip';

@Component({
  selector: 'app-trip-list',
  imports: [CommonModule, TripCard],
  templateUrl: './trip-list.html',
  styleUrls: ['./trip-list.css']
})
export class TripList implements OnInit {

  trips: Trip[] = [];
  loading = true;
  errorMessage = '';

  constructor(private tripService: TripData) {}

  ngOnInit(): void {
    this.refreshTrips();
  }

  refreshTrips(): void {
    this.loading = true;
    this.tripService.getTrips().subscribe({
      next: (data: Trip[]) => {
        this.trips = data;
        this.loading = false;
        this.errorMessage = '';
      },
      error: (err) => {
        console.error(err);
        this.loading = false;
        this.errorMessage = 'Unable to load trips. Check that the Express API is running on port 3000.';
      }
    });
  }
}
