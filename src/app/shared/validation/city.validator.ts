
import { AbstractControl, AsyncValidatorFn, FormGroup, ValidatorFn } from '@angular/forms';
import { FlightService } from '../../flight-booking/flight-search/flight.service';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/delay';

export class CityValidator {

  static validate(c: AbstractControl) {
    if (c.value == 'Graz' || c.value == 'Hamburg' || c.value == 'Jakarta' ) {
      return {};
    }
    return { city: true };
  }

  static validateWithParams(allowedCities: string[]) : ValidatorFn {
    return (c: AbstractControl) => {

      if (allowedCities.indexOf(c.value) > -1) {
        return {};
      }

      return { city2: true }
    }
  }

  static validateRoundTrips(c: AbstractControl): object {
    let group = c as FormGroup;

    let value1 = group.controls['from'].value;
    let value2 = group.controls['to'].value;

    if (value1 == value2) {
      return { roundTrip: true };
    }
    return { };
  }

  static validateAsync(flightService: FlightService): AsyncValidatorFn {
    return (c: AbstractControl)=> {

      return flightService
              .find(c.value, '')
              .map(flights => flights.length)
              .map(len => len > 0 ? {} : {cityAsync: true})
              .delay(500)

    }
  }

}
