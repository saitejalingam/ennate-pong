import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class DatabaseService {
    private itemDoc: AngularFirestoreDocument<any>;
    user: any = {
        firstName: 'Veera Sai Teja',
        lastName: 'Lingam',
        email: 'vlingam@egen.solutions'
    };

    constructor(private db: AngularFirestore) { }

    public getAllReservations(): Observable<any[]> {
        return this.db.collection('reservations',
            ref => ref.where('date', '>', this.getStartOfDay()))
            .valueChanges();
    }

    public getMyReservations(): Observable<any[]> {
        return this.db.collection('reservations',
            ref => ref.where('date', '>', this.getStartOfDay())
                .where('email', '==', this.user.email))
            .snapshotChanges();
    }

    public setReservation(slot) {
        this.db.collection('reservations').add({
            date: Date.now(),
            slot: slot,
            firstName: this.user.firstName,
            lastName: this.user.lastName,
            email: this.user.email
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
