import { FlightState, initFlightState } from './flights/flight.state';

export interface AppState {
  flights: FlightState;
  otherStuff: any;
}

export const initAppState: AppState = {
  flights: initFlightState,
  otherStuff: null
}
