import { AuthenticationGuard } from './providers/authguard.service';
import { LoginCallbackModule } from './login-callback/login-callback.module';
import { ConfigService } from './providers/config.service';
import { AdalService } from './providers/adal.service';
import { AppRoutingModule } from './app.routing';
import { RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { environment } from '../environments/environment';
import { FormsModule } from '@angular/forms';

import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireAuthModule } from 'angularfire2/auth';

import { AppComponent } from './app.component';
import { HomeModule } from './home/home.module';
import { LoginModule } from './login/login.module';
import { ReservationService } from './providers/reservation.service';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireAuthModule,
    NgbModule.forRoot(),
    HomeModule,
    LoginModule,
    LoginCallbackModule,
    RouterModule,
    AppRoutingModule
  ],
  providers: [ 
    ReservationService,
    AdalService,
    ConfigService,
    AuthenticationGuard
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
