import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

import { RoutesConstants, UrlsConstants } from '@utils/index';

import { UserFitbitGuard } from '@guards/index';

const routes: Routes = [
  {
    path: RoutesConstants.LOGIN,
    loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: RoutesConstants.TABS,
    loadChildren: () => import('./pages/tabs/tabs.module').then(m => m.TabsPageModule)
  },
  {
    path: RoutesConstants.EDIT_TARGET,
    loadChildren: () => import('./pages/edit-target/edit-target.module').then( m => m.EditTargetPageModule),
    canActivate: [ UserFitbitGuard ]
  },
  {
    path: RoutesConstants.FOOD_LOGS,
    loadChildren: () => import('./pages/food-logs/food-logs.module').then( m => m.FoodLogsPageModule),
    canActivate: [ UserFitbitGuard ]
  },
  {
    path: RoutesConstants.FEEDING,
    loadChildren: () => import('./pages/feeding/feeding.module').then( m => m.FeedingPageModule),
    canActivate: [ UserFitbitGuard ]
  },
  { path: '', redirectTo: UrlsConstants.URL_LOGIN, pathMatch: 'full' },
  { path: '**', redirectTo: UrlsConstants.URL_LOGIN }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules, relativeLinkResolution: 'legacy' })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
