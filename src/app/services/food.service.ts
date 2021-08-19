import { Injectable } from '@angular/core';
import { Food } from '../interfaces/food.model';

@Injectable({
  providedIn: 'root'
})
export class FoodService {
  private allFoods: Food[] = [];

  get allFood() {


    return this.allFoods;
  }
  constructor() { }

  addFood(foodItem: Food) {
    this.allFoods = [foodItem, ...this.allFoods];
    console.log(this.allFoods);
  }
}
