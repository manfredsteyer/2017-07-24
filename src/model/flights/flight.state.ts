import { Flight } from '../../app/entities/flight';

export interface FlightState {
  flights: Flight[];
  flightsStatistics: FlightsStatistics
}

export interface FlightsStatistics {
  countInTime: number;
  countDelayed: number;
}

export const initFlightState: FlightState = {
  flights: [],
  flightsStatistics: {
    countDelayed: 0,
    countInTime: 0
  }
}
