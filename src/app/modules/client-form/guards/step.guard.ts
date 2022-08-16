import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';

// services
import { FormsService } from '../services/forms.service';

// models
import { AppRoutes } from '../../../models/enums/app-routes.model';
import { FormSteps } from '../models/form-steps.model';

// helpers
import { getFullRoute } from '../../common/utils/get-full-route.helper';

@Injectable()
export class StepGuard implements CanActivate {
  constructor(
    private readonly formsService: FormsService,
    private readonly router: Router,
  ) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const requestedStep = route.url[route.url.length - 1].path as FormSteps | AppRoutes.CreatedClient;

    const allowNavigation = this.formsService.allowNavigationTo(requestedStep);

    if (!allowNavigation) {
      this.router.navigate([getFullRoute(AppRoutes.ClientInfo)]);
    }

    return allowNavigation;
  }
}
