import { Observable } from 'rxjs/Observable';
import { DatabaseService } from './../providers/database.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  allReservations: Observable<any[]>;
  constructor(public dbService: DatabaseService) { }

  ngOnInit() {
    this.allReservations = this.dbService.getAllReservations();
  }

  public formatSlot(slot) {
    return slot.start + ' - ' + slot.end;
  }
}