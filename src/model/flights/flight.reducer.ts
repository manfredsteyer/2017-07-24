
import { FlightsStatistics, FlightState } from './flight.state';
import { Action } from '@ngrx/store';
import { FLIGHT_LOADED, FLIGHT_STATE_UPDATED, FlightLoadedAction, FlightStateUpdatedAction } from './flight.actions';
import { Flight } from '../../app/entities/flight';

export function flightReducer(
                  state: FlightState, action: Action) {

  switch(action.type) {
    case FLIGHT_LOADED:
      return flightLoadedReducer(state, action as FlightLoadedAction);
    case FLIGHT_STATE_UPDATED:
      return flightStateUpdatedReducer(state, action as FlightStateUpdatedAction);
    default:
      return state;
  }
}

function flightLoadedReducer(
  state: FlightState,
  action: FlightLoadedAction): FlightState {

  return {
    flights: action.payload,
    flightsStatistics: calcStats(action.payload)
  }
}

function flightStateUpdatedReducer(state: FlightState, action: FlightStateUpdatedAction): FlightState {

  let newFlight = action.payload;
  let oldFlights = state.flights;

  let idx = oldFlights.findIndex(f => f.id == newFlight.id);
  let newFlights = [
    ...oldFlights.slice(0, idx),
    newFlight,
    ...oldFlights.slice(idx+1)
  ];

  return {
    flights: newFlights,
    flightsStatistics: calcStats(newFlights)
  }
}

function calcStats(payload: Flight[]): FlightsStatistics {
  return {
    countDelayed: payload.filter(f => f.delayed).length,
    countInTime: payload.filter(f => !f.delayed).length
  }
}
