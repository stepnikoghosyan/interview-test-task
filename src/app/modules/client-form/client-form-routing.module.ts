import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// guards
import { StepGuard } from './guards/step.guard';

// enums
import { AppRoutes } from '../../models/enums/app-routes.model';

// components
import { ClientFormComponent } from './client-form.component';
import { ClientInfoComponent } from './components/client-info/client-info.component';
import { ClientAddressComponent } from './components/client-address/client-address.component';
import { ClientIdentityComponent } from './components/client-identity/client-identity.component';

const routes: Routes = [
  {
    path: '',
    component: ClientFormComponent,
    children: [
      {
        path: AppRoutes.ClientInfo,
        component: ClientInfoComponent,
        canActivate: [
          StepGuard,
        ]
      },
      {
        path: AppRoutes.ClientAddress,
        component: ClientAddressComponent,
        canActivate: [
          StepGuard,
        ]
      },
      {
        path: AppRoutes.ClientIdentity,
        component: ClientIdentityComponent,
        canActivate: [
          StepGuard,
        ]
      },
      {
        path: '**',
        redirectTo: AppRoutes.ClientInfo,
      },
    ],
  },
  {
    path: '**',
    redirectTo: AppRoutes.ClientInfo,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ClientFormRoutingModule {
}
