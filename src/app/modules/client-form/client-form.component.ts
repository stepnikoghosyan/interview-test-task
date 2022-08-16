import { Component } from '@angular/core';

// services
import { FormsService } from './services/forms.service';
import { NotificationsService } from '../common/modules/notifications/services/notifications.service';

// models
import { NotificationTypes } from '../common/modules/notifications/models/notification-types.model';

@Component({
  templateUrl: './client-form.component.html',
})
export class ClientFormComponent {
  constructor(
    private readonly formsService: FormsService,
    private readonly notificationsService: NotificationsService,
  ) {
  }

  public handlePrevClick(): void {
    this.formsService.goToPrevStep();
  }

  public handleNextClick(): void {
    if (this.isLastStep) {
      this.notificationsService.showNotification({
        title: 'Success',
        message: 'Profile Created',
        type: NotificationTypes.SUCCESS,
      });
    }

    this.formsService.goToNextStep();
  }

  public get isFirstStep(): boolean {
    return this.formsService.isFirstStep;
  }

  public get isLastStep(): boolean {
    return this.formsService.isLastStep;
  }
}
