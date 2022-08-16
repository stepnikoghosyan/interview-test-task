import { ModuleWithProviders, NgModule } from '@angular/core';

// services
import { NotificationsService } from './services/notifications.service';

@NgModule({})
export class NotificationsModule {
  static forRoot(): ModuleWithProviders<NotificationsModule> {
    return {
      ngModule: NotificationsModule,
      providers: [
        NotificationsService,
      ],
    };
  }
}
