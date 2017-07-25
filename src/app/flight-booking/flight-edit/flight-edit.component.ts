import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Flight } from "app/entities/flight";
import { FlightService } from "app/flight-booking/flight-search/flight.service";
import { Exit } from '../../shared/exit-guard/exit';
import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'flight-edit',
  templateUrl: './flight-edit.component.html'
})
export class FlightEditComponent implements OnInit, Exit {

  form: FormGroup;

  exitInfo = {
    sender: null,
    showWarning: false
  }

  decide(decision: boolean): void {
    this.exitInfo.sender.next(decision);
    this.exitInfo.sender.complete();
    this.exitInfo.showWarning = false;
  }

  canExit(): Observable<boolean> {
    return Observable.create((sender: Observer<boolean>) => {
      this.exitInfo.sender = sender;
      this.exitInfo.showWarning = true;
    });
  }

  formMetadata = [
    { name: 'id', label: 'Flight-Id', control: null },
    { name: 'from', label: 'Airport of Departure' }
  ];

  constructor(
    private route: ActivatedRoute,
    private flightService: FlightService,
    private fb: FormBuilder) {

    this.form = fb.group({
      from: [
        '',
        [
          Validators.required,
          Validators.minLength(3)
        ]
      ],
      to: [''],
      date: [''],
      id: [null]
    });

    this.form.valueChanges.subscribe(changes => {
      console.debug('changes', changes);
    });

    this.form.controls['from'].valueChanges.subscribe(changes => {
      console.debug('from changed', changes);
    });

  }

  id: string;
  showDetails: string;
  flight: Flight;
  message: string;

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.id = params['id'];
      this.showDetails = params['showDetails'];
    });

    this.route.data.subscribe(data => {
      this.flight = data['flight'];
      this.form.patchValue(this.flight);
    })
  }

  save() {
    this.flightService.save(this.form.value).subscribe(
      f => {
        this.form.patchValue(f);
        this.message = 'Successfully saved!';
      },
      err => {
        console.error(err);
        this.message = 'Fehler beim Speichern: ' + err.text();
      }
    );
  }
}
