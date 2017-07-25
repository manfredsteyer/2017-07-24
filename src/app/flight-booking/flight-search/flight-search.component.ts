import { Component, ViewEncapsulation, ViewChild } from '@angular/core';
import { Http, URLSearchParams, Headers } from '@angular/http';
import { FlightService } from './flight.service';
import { Flight } from '../../entities/flight';
import { NgForm } from '@angular/forms';
import { Observable, Observer } from 'rxjs';
import { AppState } from '../../../model/app.state';
import { Store } from '@ngrx/store';
import { FlightsStatistics } from '../../../model/flights/flight.state';
import { FlightsLoadAction, FlightStateUpdatedAction } from '../../../model/flights/flight.actions';

@Component({
  selector: 'flight-search',
  templateUrl: 'flight-search.component.html',
  styleUrls: ['./flight-search.component.css']
})
export class FlightSearchComponent {

  from: string;
  to: string;
  // flights: Array<Flight> = [];
  selectedFlight: Flight;

  // flights --> flights()
  get flights() {
    return this.flightService.flights;
  }

  basket: any = {
    "3": true,
    "4": false,
    "5": true
  };
  //private http: Http;

  flights$: Observable<Flight[]>;
  statistics$: Observable<FlightsStatistics>;

  constructor(
    private store: Store<AppState>,
    private flightService: FlightService) {

    this.flights$ = store.select(s => s.flights.flights);
    this.statistics$ = store.select(s => s.flights.flightsStatistics);
  }

  setDelayed(f: Flight, delayed: boolean) {
    //f.delayed = delayed;
    let newFlight: Flight = {
      ...f,
      delayed
    }

    this.store.dispatch(new FlightStateUpdatedAction(newFlight));
  }

  search(): void {
      // this.flightService.load(this.from, this.to);
      this.store.dispatch(new FlightsLoadAction({from: this.from, to: this.to}));
  }

  delay(): void {
    this.flightService.delay();
  }

  select(f: Flight) {
    this.selectedFlight = f;
  }

}
