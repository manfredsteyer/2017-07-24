import { Flight } from '../../entities/flight';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { FlightService } from '../flight-search/flight.service';
import { Injectable } from '@angular/core';

import 'rxjs/add/operator/catch';
// import 'rxjs'

@Injectable()
export class FlightResolver implements Resolve<Flight> {

  constructor(private flightService: FlightService) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Flight> {
    let id = route.params['id'];
    return this
            .flightService
            .findById(id)
            .catch(e => Observable.of({}));
  }
}
