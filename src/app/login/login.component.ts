import { AdalService } from './../providers/adal.service';
import { Observable } from 'rxjs/Observable';
import { ReservationService } from './../providers/reservation.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  allReservations: Observable<any[]>;
  
  constructor(
    public resService: ReservationService,
    public adalService: AdalService
  ) { }

  ngOnInit() {
    this.allReservations = this.resService.getAllReservations();
  }

  public login() {
    this.adalService.login();
  }

  public formatSlot(slot) {
    return slot.start + ' - ' + slot.end;
  }
}