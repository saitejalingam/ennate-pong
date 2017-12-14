import { LoginComponent } from './login.component';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@NgModule({
    declarations: [
        LoginComponent
    ],
    imports: [
        RouterModule,
        NgbModule,
        FormsModule,
        CommonModule
    ],
    exports: [LoginComponent],
    providers: []
})
export class LoginModule { }