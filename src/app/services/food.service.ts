import { Injectable } from '@angular/core';

import { AngularFirestore, DocumentReference } from '@angular/fire/firestore';
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
  addFood(foodItem: Food) {
    return this.afs.collection('freezer').add(foodItem);
  }

  deleteFood(id: string): Observable<any> {
    return from(this.afs.doc(`freezer/${id}`).delete());
  }
}
