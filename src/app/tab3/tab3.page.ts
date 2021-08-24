import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Food } from '../interfaces/food.interface';
import { FoodService } from '../services/food.service';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page implements OnInit, OnDestroy {
  allFoodToEatSoon: Food[];
  sub: Subscription;
  nbOfDaysAgo = 15;
  constructor(private foodService: FoodService) { }

  ngOnInit() {
    this.getFoodToEatBeforeDaysAgo();
  }

  getFoodToEatBeforeDaysAgo() {
    this.sub = this.foodService.getFoodToEatBeforeDaysAgo(this.nbOfDaysAgo).subscribe(data => {
      console.log('manger avannt le / data', data);
      this.allFoodToEatSoon = data.map(foodItem => ({
        betterToEatBefore: (foodItem.betterToEatBefore as any).toDate(),
        foodName: foodItem.foodName,
        datePlacedInFreezer: (foodItem.datePlacedInFreezer as any).toDate(),
        category: foodItem.category
      }));
    });
  }
  ionViewWillEnter() {
    this.getFoodToEatBeforeDaysAgo();
  }


  ngOnDestroy() {
    this.sub.unsubscribe();
  }

}
