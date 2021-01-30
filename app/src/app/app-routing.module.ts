import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

import { RoutesConstants } from '@utils/index';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./shared/components/tabs/tabs.module').then(m => m.TabsPageModule)
  },
  {
    path: RoutesConstants.EDIT_TARGET,
    loadChildren: () => import('./pages/edit-target/edit-target.module').then( m => m.EditTargetPageModule)
  }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules, relativeLinkResolution: 'legacy' })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
