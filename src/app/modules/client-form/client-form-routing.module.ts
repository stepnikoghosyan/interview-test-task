import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

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
      },
      {
        path: AppRoutes.ClientAddress,
        component: ClientAddressComponent,
      },
      {
        path: AppRoutes.ClientIdentity,
        component: ClientIdentityComponent,
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
