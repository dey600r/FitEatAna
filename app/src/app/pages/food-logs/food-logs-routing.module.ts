import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserFitbitGuard } from '@guards/index';
import { RoutesConstants, UrlsConstants } from '@utils/index';

import { FoodLogsPage } from './food-logs.page';

const routes: Routes = [
  {
    path: '',
    component: FoodLogsPage,
  },
  {
    path: RoutesConstants.ADD_FOOD,
    loadChildren: () => import('./add-food/add-food.module').then( m => m.AddFoodPageModule),
    canActivate: [ UserFitbitGuard ]
  },
  { path: '', redirectTo: UrlsConstants.URL_FOOD_LOGS, pathMatch: 'full' },
  { path: '**', redirectTo: UrlsConstants.URL_FOOD_LOGS }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FoodLogsPageRoutingModule {}
