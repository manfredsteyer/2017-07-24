import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Http, HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { BASE_URL } from './app.tokens';
import { EventService } from './event.service';
import { BasketComponent } from './basket/basket.component';
import { AppRouterModule } from './app.routes';
import { HomeComponent } from './home/home.component';
import { SharedModule } from './shared/shared.module';
import { OAuthModule } from 'angular-oauth2-oidc';

import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { AuthModule } from './auth/auth.module';
import { StoreModule } from '@ngrx/store';
import { initAppState } from '../model/app.state';
import { appReducer, mainReducer } from '../model/app.reducer';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { EffectsModule } from '@ngrx/effects';
import { FlightEffects } from '../model/flights/flight.effects';
import { FlightService } from './flight-booking/flight-search/flight.service';

export function createLoader(http: Http) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AuthModule.forRoot(),
    // FlightBookingModule,
    AppRouterModule,
    SharedModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: createLoader,
        deps: [Http]
      }
    }),
    OAuthModule.forRoot(),
    StoreModule.forRoot(mainReducer, {
      initialState: initAppState
    }),
    StoreDevtoolsModule.instrument(),
    EffectsModule.forRoot([FlightEffects])
  ],
  declarations: [
    AppComponent,
    BasketComponent,
    HomeComponent
  ],
  providers: [
    // { provide: FlightService, useClass: FlightService }
    // FlightService
    FlightService,
    EventService,
    {provide: BASE_URL, useValue: 'http://www.angular.at/api'}
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}


