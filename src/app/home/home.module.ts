import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HomeComponent } from './home.component';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@NgModule({
    declarations: [
        HomeComponent
    ],
    imports: [
        RouterModule,
        NgbModule,
        FormsModule,
        CommonModule
    ],
    exports: [ HomeComponent ],
    providers: []
})
export class HomeModule {}