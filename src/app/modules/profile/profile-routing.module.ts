import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// components
import { ProfileComponent } from './components/profile/profile.component';
import { getFullRoute } from '../common/utils/get-full-route.helper';
import { AppRoutes } from '../../models/enums/app-routes.model';

const routes: Routes = [
  {
    path: ':id',
    component: ProfileComponent,
  },
  {
    path: '**',
    redirectTo: getFullRoute(AppRoutes.ClientInfo),
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProfileRoutingModule {
}
