import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
// enums
import { AppRoutes } from './models/enums/app-routes.model';

const routes: Routes = [
  {
    path: AppRoutes.ClientForm,
    loadChildren: () => import('./modules/client-form/client-form.module').then(m => m.ClientFormModule),
  },
  {
    path: '**',
    redirectTo: AppRoutes.ClientForm,
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
