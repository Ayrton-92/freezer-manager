import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';

import { FoodService } from '../services/food.service';
import { Food } from '../interfaces/food.model';
@Component({
    // eslint-disable-next-line @angular-eslint/component-selector
    selector: 'edit-modal',
    templateUrl: './edit-modal.html'
})
// eslint-disable-next-line @angular-eslint/component-class-suffix
export class EditModal implements OnInit, OnDestroy {
    @Input() foodId: string;
    foodItem: any;
    sub: Subscription;
    form: FormGroup;

    constructor(private foodService: FoodService, private modalCtrl: ModalController, private fb: FormBuilder) { }
    ngOnInit() {
        this.sub = this.foodService.getFood(this.foodId).subscribe(data => {
            this.foodItem = {
                id: data.payload.id,
                ...data.payload.data() as Food
            };
            this.createForm();

            console.log('this.foodItem', this.foodItem);
        }, err => {
            console.error(err);

        });

    }

    createForm() {
        this.form = this.fb.group({
            foodName: new FormControl(this.foodItem.foodName, {
                validators: [Validators.required]
            }),
            datePlacedInFreezer: new FormControl(this.foodItem.datePlacedInFreezer, {
                validators: [Validators.required]
            })
        });
    }

    update() {
        console.log(this.form.value);
        const updateFood = { ...this.form.value, id: this.foodItem.id };
        this.foodService.updateFood(updateFood).subscribe(() => {
            console.log('updated!');
        });
    }

    goBack() {
        this.modalCtrl.dismiss();
    }

    ngOnDestroy() {
        this.sub.unsubscribe();
    }
}
