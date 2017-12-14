import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subject } from "rxjs/Subject";
import { debounceTime } from 'rxjs/operator/debounceTime';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

import { DatabaseService } from './../providers/database.service';
import { slots } from '../shared/app.constants';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  private _success = new Subject<string>();
  private _error = new Subject<string>();
  private modalRef: any;

  timeSlots: any[];
  successMessage: string = null;
  errorMessage: string = null;

  allReservations: any[];
  myReservations: any[];
  myReservationsDocs: any[];

  constructor(
    public dbService: DatabaseService,
    private modalService: NgbModal
  ) { }

  ngOnInit() {
    this.dbService.getMyReservations()
      .subscribe((result) => {
        console.log(result.map(s => s.payload.doc.data()));
        this.myReservationsDocs = result;
        this.myReservations = result.map(s => s.payload.doc.data());
      });

    this.dbService.getAllReservations()
      .subscribe((result) => {
        this.allReservations = result;

        this.timeSlots = [...slots];
        this.allReservations.map(reservation => {
          let idx = this.timeSlots.findIndex(slot => slot.start === reservation.slot.start);
          idx > -1 && this.timeSlots.splice(idx, 1);
        });
      });

    this._success.subscribe((message) => this.successMessage = message);
    this._error.subscribe((message) => this.errorMessage = message);

    debounceTime.call(this._success, 2000).subscribe(() => this.successMessage = null);
    debounceTime.call(this._error, 5000).subscribe(() => this.errorMessage = null);
  }

  public reserveSlot(slot) {
    if (this.myReservations.length >= 2) {
      this._error.next(`cannot reserve more than two slots per day!`);
    } else {
      this.dbService.setReservation(slot);
      this._success.next(`${this.formatSlot(slot)} - reservation successful!`);
    }
  }

  public confirmCancel() {
    this.modalRef.close();
  }

  public dismissCancel() {
    this.modalRef.dismiss();
  }

  public cancelReservation(reservation, cancelModal) {
    this.modalRef = this.modalService.open(cancelModal);
    this.modalRef.result.then((result) => {
        this.dbService.cancelReservation(reservation);
      }, (reason) => {});
  }

  public formatSlot(slot) {
    return slot.start + ' - ' + slot.end;
  }
}
