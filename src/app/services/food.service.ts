import { Injectable } from '@angular/core';

import { AngularFirestore, DocumentReference, DocumentSnapshot, Action } from '@angular/fire/firestore';
import { DocumentChangeAction } from '@angular/fire/firestore';

import { from, Observable } from 'rxjs';

import { Food } from '../interfaces/food.model';

@Injectable({
  providedIn: 'root'
})
export class FoodService {

  constructor(private afs: AngularFirestore) { }

  allFood() {
    return this.afs.collection('freezer').snapshotChanges();
  }

  // eslint-disable-next-line @typescript-eslint/ban-types
  getFood(id: string): Observable<Action<DocumentSnapshot<{}>>> {
    return this.afs.collection('freezer').doc(id).snapshotChanges();
  }

  addFood(foodItem: Food) {
    return this.afs.collection('freezer').add(foodItem);
  }

  updateFood(food: Food): Observable<any> {
    return from(this.afs.doc(`freezer/${food.id}`).update(food));
  }

  deleteFood(id: string): Observable<any> {
    return from(this.afs.doc(`freezer/${id}`).delete());
  }
}
