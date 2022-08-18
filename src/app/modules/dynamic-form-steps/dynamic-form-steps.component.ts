import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { switchMap, takeUntil } from 'rxjs/operators';

// services
import { FormsService } from './services/forms.service';
import { UsersService } from '../common/services/users.service';
import { NotificationsService } from '../common/modules/notifications/services/notifications.service';

// models
import { ControlTypes } from './models/control-types.model';
import { ICurrentStepData } from './models/current-step-data.model';
import { Steps } from './models/steps.model';
import { NotificationTypes } from '../common/modules/notifications/models/notification-types.model';
import { AppRoutes } from '../../models/enums/app-routes.model';

// helpers
import { getFullRoute } from '../common/utils/get-full-route.helper';

@Component({
  selector: 'app-dynamic-form-steps',
  templateUrl: './dynamic-form-steps.component.html',
  providers: [FormsService],
})
export class DynamicFormStepsComponent implements OnInit, OnDestroy {
  public form: FormGroup;

  public currentStepData?: ICurrentStepData;

  public isLoading = false;

  public readonly CONTROL_TYPES = ControlTypes;

  private readonly subscriptions$ = new Subject<void>();

  constructor(
    private readonly usersService: UsersService,
    private readonly formsService: FormsService,
    private readonly notificationsService: NotificationsService,
    private readonly route: ActivatedRoute,
    private readonly router: Router,
  ) {
    this.form = formsService.form;
  }

  ngOnInit(): void {
    this.subscribeToRouteChanges();
    this.subscribeToCurrentStepData();
  }

  private subscribeToRouteChanges(): void {
    this.route.paramMap
      .pipe(takeUntil(this.subscriptions$))
      .subscribe((params: ParamMap) => {
        this.formsService.updateCurrentStep(params.get('formStepId') as Steps);
      });
  }

  private subscribeToCurrentStepData(): void {
    this.formsService.currentStepData$
      .pipe(takeUntil(this.subscriptions$))
      .subscribe({
        next: (value) => {
          if (!value) {
            return;
          }

          this.currentStepData = value;
        },
      });
  }

  public handleNavigation(event: 'next' | 'prev'): void {
    if (event === 'next') {
      this.handleNextClick();
    } else {
      this.handlePrevClick();
    }
  }

  private handleNextClick(): void {
    if (this.formsService.isLastStep()) {
      this.handleSubmit();
    } else {
      this.formsService.goToNextStep();
    }
  }

  private handlePrevClick(): void {
    this.formsService.goToPrevStep();
  }

  private handleSubmit(): void {
    if (this.isLoading) {
      return;
    }

    this.form.markAllAsTouched();

    if (!this.form.valid) {
      return;
    }

    this.isLoading = true;
    this.form.disable();

    this.formsService.formValueToPayload
      .pipe(
        switchMap((payload) => this.usersService.createUser(payload)),
        takeUntil(this.subscriptions$),
      )
      .subscribe({
        next: (response) => this.handleSuccess(response.id),
        error: () => this.handleError(),
      });
  }

  private handleSuccess(id: number): void {
    this.notificationsService.showNotification({
      title: 'Success',
      message: 'Profile Created',
      type: NotificationTypes.SUCCESS,
    });

    this.router.navigate([getFullRoute(AppRoutes.CreatedClient), id]);
  }

  private handleError(): void {
    this.notificationsService.showNotification({
      title: 'Failure',
      message: 'Could not create user',
      type: NotificationTypes.ERROR,
    });

    this.isLoading = false;
    this.form.enable();
  }

  ngOnDestroy(): void {
    this.subscriptions$.next();
    this.subscriptions$.complete();
  }
}
