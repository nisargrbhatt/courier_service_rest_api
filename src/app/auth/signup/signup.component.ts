import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { NgForm } from '@angular/forms';

import { AuthData } from './../auth-data.model';
import { AuthService } from './../auth.service';

@Component({
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent implements OnInit, OnDestroy {
  Gender = [
    { value: 'Male', viewValue: 'Male' },
    { value: 'Female', viewValue: 'Female' },
  ];
  isLoading = false;
  private authStatusSub: Subscription;

  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.authStatusSub = this.authService
      .getAuthStatusListener()
      .subscribe((authStatus) => {
        this.isLoading = false;
      });
  }

  onSignup(form: NgForm) {
    if (form.invalid) {
      return;
    }
    this.isLoading = true;
    const authData: AuthData = {
      _id: null,
      full_name: form.value.full_name,
      birthdate: form.value.birthdate,
      gender: form.value.gender,
      address: form.value.address,
      contact_no: form.value.contact_no,
      email: form.value.email,
      password: form.value.password,
    };
    this.authService.createUser(authData);
  }
  ngOnDestroy() {
    this.authStatusSub.unsubscribe();
  }
}
