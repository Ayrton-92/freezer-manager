import { Component, OnInit } from '@angular/core';
import { Food } from '../interfaces/food.model';
import { FoodService } from '../services/food.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit {
  allFoodInFreezer = [];
  constructor(private foodService: FoodService) { }

  ngOnInit() {
    this.allFoodInFreezer = this.foodService.allFood;
    console.log('ngOnInit', this.allFoodInFreezer);
  }
  ionViewWillEnter() {
    this.allFoodInFreezer = this.foodService.allFood;
    console.log('ionViewWillEnter', this.allFoodInFreezer);
  }
}
