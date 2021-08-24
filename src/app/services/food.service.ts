import { Injectable } from '@angular/core';

import { AngularFirestore, DocumentReference, DocumentSnapshot, Action } from '@angular/fire/firestore';
import { DocumentChangeAction } from '@angular/fire/firestore';

import { from, Observable } from 'rxjs';

import { Food } from '../interfaces/food.interface';

@Injectable({
  providedIn: 'root'
})
export class FoodService {

  constructor(private afs: AngularFirestore) { }

  allFood() {
    // return this.afs.collection('freezer').snapshotChanges();
    const freezerCollectionRef = this.afs.collection<Food>('freezer', ref => ref.orderBy('foodName', 'asc'));
    return freezerCollectionRef.snapshotChanges();
  }

  // eslint-disable-next-line @typescript-eslint/ban-types
  getFood(id: string): Observable<Action<DocumentSnapshot<{}>>> {
    return this.afs.collection('freezer').doc(id).snapshotChanges();
  }

  addFood(foodItem: Food) {
    return this.afs.collection('freezer').add(foodItem);
  }

  computeMaxDateToKeepFood(category, datePlacedInFreezer) {
    const securityMarginInDays = 7;
    const maxStayInFreezerInDays = category.maxStayInFreezerInMonth * 30;
    const maxStayInFreezerInDaysWithMargin = maxStayInFreezerInDays - securityMarginInDays;
    // compute finale date
    const currentDate = new Date(datePlacedInFreezer);
    const finaleDate = currentDate.setDate(currentDate.getDate() + maxStayInFreezerInDaysWithMargin);
    return new Date(finaleDate);
  }

  getFoodToEatBeforeDaysAgo(nbOfDays: number): Observable<Food[]> {
    const daysInMilliseconds = nbOfDays * 24 * 3600 * 1000;
    const dateInFuture = new Date(Date.now() + daysInMilliseconds);
    return this.afs.collection('freezer', ref => ref.where('betterToEatBefore', '<', dateInFuture)).valueChanges() as Observable<Food[]>;
  }

  updateFood(food: Food): Observable<any> {
    return from(this.afs.doc(`freezer/${food.id}`).update(food));
  }

  deleteFood(id: string): Observable<any> {
    return from(this.afs.doc(`freezer/${id}`).delete());
  }
}
