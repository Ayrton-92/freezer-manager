import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { ModalController, ToastController } from '@ionic/angular';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import categories from '../shared/food.categories';
import { Category } from '../interfaces/category.interface';

import { FoodService } from '../services/food.service';
import { Food } from '../interfaces/food.interface';
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
    allCategories: Category[];

    // eslint-disable-next-line max-len
    constructor(private foodService: FoodService, private modalCtrl: ModalController, private fb: FormBuilder, private toastCtrl: ToastController) { }
    ngOnInit() {
        this.allCategories = categories;
        this.sub = this.foodService.getFood(this.foodId).subscribe(data => {
            this.foodItem = {
                id: data.payload.id,
                ...data.payload.data() as Food
            };
            this.createForm();

            // console.log('this.foodItem', this.foodItem);
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
            }),
            category: new FormControl(this.foodItem.category, Validators.required),
        });
    }

    update() {
        console.log(this.form.value);
        const updateFood = { ...this.form.value, id: this.foodItem.id };
        this.foodService.updateFood(updateFood).subscribe(async () => {
            const toast = await this.toastCtrl.create({
                message: 'Modification réussi',
                duration: 2000,
                color: 'primary',
                position: 'middle'
            });
            toast.present();
        });
    }

    goBack() {
        this.modalCtrl.dismiss();
    }

    ngOnDestroy() {
        this.sub.unsubscribe();
    }
}
