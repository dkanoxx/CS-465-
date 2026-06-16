import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TripData } from '../services/trip-data';
import { TripCard } from '../trip-card/trip-card';

@Component({
  selector: 'app-trip-list',
  standalone: true,
  imports: [CommonModule, TripCard],
  templateUrl: './trip-list.html',
  styleUrls: ['./trip-list.css']
})
export class TripList implements OnInit {

  trips: any[] = [];
  loading = true;

  constructor(private tripService: TripData) {}

  ngOnInit(): void {
    this.tripService.getTrips().subscribe({
      next: (data: any) => {
        this.trips = data;
        this.loading = false;
      },
      error: (err) => {
        console.error(err);
        this.loading = false;
      }
    });
  }

  refreshTrips() {
    this.tripService.getTrips().subscribe((data:any)=>{
      this.trips=data;
    });
  }
}
