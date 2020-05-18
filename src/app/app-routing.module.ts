import { CourierOrderComponent } from './courier/courier-order/courier-order.component';
import { CourierListComponent } from './courier/courier-list/courier-list.component';
import { HomemainComponent } from './homemain/homemain.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from './auth/auth.guard';
import { SignupComponent } from './auth/signup/signup.component';
import { LoginComponent } from './auth/login/login.component';

const routes: Routes = [
  { path: '', component: HomemainComponent },
  { path: 'orders', component: CourierListComponent, canActivate: [AuthGuard] },
  {
    path: 'addorder',
    component: CourierOrderComponent,
    canActivate: [AuthGuard],
  },
  { path: 'signup', component: SignupComponent },
  { path: 'login', component: LoginComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard],
})
export class AppRoutingModule {}
