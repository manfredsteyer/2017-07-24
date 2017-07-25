
import { flightReducer } from './flights/flight.reducer';
import { combineReducers } from '@ngrx/store';

export const mainReducer = {
  flights: flightReducer
}

export const appReducer = combineReducers(mainReducer);
