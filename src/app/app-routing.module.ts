import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// enums
import { AppRoutes } from './models/enums/app-routes.model';
import { getFullRoute } from './modules/common/utils/get-full-route.helper';

const routes: Routes = [
  // {
  //   path: AppRoutes.ClientForm,
  //   loadChildren: () => import('./modules/client-form/client-form.module').then(m => m.ClientFormModule),
  // },
  {
    path: AppRoutes.ClientForm,
    loadChildren: () => import('./modules/dynamic-form-steps/dynamic-form-steps.module').then(m => m.DynamicFormStepsModule),
  },
  {
    path: AppRoutes.CreatedClient,
    loadChildren: () => import('./modules/profile/profile.module').then(m => m.ProfileModule),
  },
  {
    path: '**',
    redirectTo: getFullRoute(AppRoutes.ClientInfo),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {
}
