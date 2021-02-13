import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserFitbitGuard } from '@guards/index';
import { RoutesConstants } from '@utils/index';

import { LoginPage } from './login.page';

const routes: Routes = [
  {
    path: '',
    component: LoginPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LoginPageRoutingModule {}
