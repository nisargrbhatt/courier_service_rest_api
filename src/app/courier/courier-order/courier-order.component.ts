import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { mimeType } from './mime-type.validator';
import { AuthService } from './../../auth/auth.service';
import { CourierService } from './../courier.service';

@Component({
  templateUrl: './courier-order.component.html',
  styleUrls: ['./courier-order.component.css'],
})
export class CourierOrderComponent implements OnInit, OnDestroy {
  deliveryPicker = [
    { value: 1, viewValue: 'Normal : Free Cost' },
    { value: 2, viewValue: 'Premium : Extra Cost' },
  ];
  isLoading = false;
  form: FormGroup;
  imagePreview: string;
  private authStausSub: Subscription;

  constructor(
    private courierService: CourierService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.authStausSub = this.authService
      .getAuthStatusListener()
      .subscribe((authStatus) => {
        this.isLoading = false;
      });
    this.form = new FormGroup({
      item_name: new FormControl(null, { validators: [Validators.required] }),
      item_weight: new FormControl(null, { validators: [Validators.required] }),
      pickup_location: new FormControl(null, {
        validators: [Validators.required],
      }),
      drop_location: new FormControl(null, {
        validators: [Validators.required],
      }),
      delivery_type: new FormControl(null, {
        validators: [Validators.required],
      }),
      order_date: new FormControl(null, { validators: [Validators.required] }),
      image: new FormControl(null, {
        validators: [Validators.required],
        asyncValidators: [mimeType],
      }),
    });
  }
  onOrder() {
    if (this.form.invalid) {
      return;
    }
    this.isLoading = true;
    const userId = this.authService.getUserId();
    const orderData = {
      _id: null,
      item_name: this.form.value.item_name,
      item_weight: this.form.value.item_weight,
      pickup_location: this.form.value.pickup_location,
      drop_location: this.form.value.drop_location,
      delivery_type: this.form.value.delivery_type,
      order_date: this.form.value.order_date,
      image: this.form.value.image,
      order_assigner: userId,
      work_assigned: null,
      item_status: false,
    };

    this.courierService.addOrder(orderData);
    this.form.reset();
  }
  onImagePicked(event: Event) {
    const file = (event.target as HTMLInputElement).files[0];
    this.form.patchValue({ image: file });
    this.form.get('image').updateValueAndValidity();
    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result as string;
    };
    reader.readAsDataURL(file);
  }
  ngOnDestroy() {
    this.authStausSub.unsubscribe();
  }
}
