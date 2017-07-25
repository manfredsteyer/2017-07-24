import { Action } from '@ngrx/store';
import { Flight } from '../../app/entities/flight';

export const FLIGHT_LOADED = 'FLIGHT_LOADED';
export const FLIGHT_STATE_UPDATED = 'FLIGHT_STATE_UPDATED';
export const FLIGHTS_LOAD = 'FLIGHT_LOAD';


export interface FlightParams {
  from: string;
  to: string;
}

export class FlightsLoadAction implements Action {
  type = FLIGHTS_LOAD;
  constructor(public payload: FlightParams) {
  }
}

export class FlightLoadedAction implements Action {
  type = FLIGHT_LOADED;
  constructor(public payload: Flight[]) {
  }
}

export class FlightStateUpdatedAction implements Action {
  type = FLIGHT_STATE_UPDATED;
  constructor(public payload: Flight) {
  }
}


