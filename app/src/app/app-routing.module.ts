import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

import { RoutesConstants } from '@utils/index';

import { UserFitbitGuard } from '@guards/index';

const routes: Routes = [
  {
    path: RoutesConstants.LOGIN,
    loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: RoutesConstants.TABS,
    loadChildren: () => import('./shared/components/tabs/tabs.module').then(m => m.TabsPageModule)
  },
  {
    path: RoutesConstants.EDIT_TARGET,
    loadChildren: () => import('./pages/edit-target/edit-target.module').then( m => m.EditTargetPageModule),
    canActivate: [ UserFitbitGuard ]
  },
  {
    path: '',
    redirectTo: RoutesConstants.LOGIN,
    pathMatch: 'full'
  }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules, relativeLinkResolution: 'legacy' })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
