import { Injectable } from '@angular/core';
import { FlightService } from '../../app/flight-booking/flight-search/flight.service';
import { Actions, Effect } from '@ngrx/effects';
import { FlightLoadedAction, FLIGHTS_LOAD, FlightsLoadAction } from './flight.actions';
import { Action } from '@ngrx/store';
@Injectable()
export class FlightEffects {

  constructor(
    private flightService: FlightService,
    private actions$: Actions) {
  }

  @Effect() loadFlights$ =
              this.actions$
                  .ofType(FLIGHTS_LOAD)
                  .switchMap((a: FlightsLoadAction) =>
                      this.flightService.find(a.payload.from, a.payload.to))
                  .map(flights => new FlightLoadedAction(flights));

}
