import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

import { RoutesConstants } from '@utils/index';

const routes: Routes = [
  {
    path: RoutesConstants.TABS,
    component: TabsPage,
    children: [
      {
        path: RoutesConstants.HOME,
        loadChildren: () => import('../../../pages/home/home.module').then(m => m.HomePageModule)
      },
      {
        path: RoutesConstants.TARGET,
        loadChildren: () => import('../../../pages/target/target.module').then(m => m.TargetPageModule)
      },
      {
        path: RoutesConstants.PROFILE,
        loadChildren: () => import('../../../pages/profile/profile.module').then(m => m.ProfilePageModule)
      },
      {
        path: '',
        redirectTo: RoutesConstants.URL_HOME,
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: RoutesConstants.URL_HOME,
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TabsPageRoutingModule {}
