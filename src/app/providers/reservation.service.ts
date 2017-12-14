import { AdalService } from './adal.service';
import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class ReservationService {
    private itemDoc: AngularFirestoreDocument<any>;
    private user: any;

    constructor(
        private db: AngularFirestore,
        private adalService: AdalService 
    ) { 
        this.user = adalService.userInfo;
    }

    public getAllReservations(): Observable<any[]> {
        return this.db.collection('reservations',
            ref => ref.where('date', '>', this.getStartOfDay()))
            .valueChanges();
    }

    public getMyReservations(): Observable<any[]> {
        return this.db.collection('reservations',
            ref => ref.where('date', '>', this.getStartOfDay())
                .where('email', '==', this.user.userName))
            .snapshotChanges();
    }

    public setReservation(slot) {
        this.db.collection('reservations').add({
            date: Date.now(),
            slot: slot,
            firstName: this.user.profile.given_name,
            lastName: this.user.profile.family_name,
            email: this.user.userName
        });
    }

    public cancelReservation(reservation) {
        this.itemDoc = this.db.doc<any>('reservations/' + reservation.payload.doc.id);
        this.itemDoc.delete();
    }

    private getStartOfDay() {
        return new Date().setHours(0, 0, 0, 0);
    }
}
