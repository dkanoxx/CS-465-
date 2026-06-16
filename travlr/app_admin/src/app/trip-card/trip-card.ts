import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-trip-card',
  imports: [],
  templateUrl: './trip-card.html',
  styleUrl: './trip-card.css'
})
export class TripCard {
  @Input() trip: any;
}