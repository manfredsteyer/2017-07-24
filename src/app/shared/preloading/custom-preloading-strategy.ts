

import { PreloadingStrategy, Route } from '@angular/router';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs';

@Injectable()
export class CustomPreloadingStrategy implements PreloadingStrategy {

  preload(route: Route, fn: () => Observable<any>): Observable<any> {
    /*
    if (route.component.name == 'FlightSearchComponent'
      && ...) {
    }
    */

    if (route.data['preload']) {
      return fn();
    }

    return Observable.of(null);

    //return Observable.of(true).delay(7000).switchMap(x => fn());
  }


}
