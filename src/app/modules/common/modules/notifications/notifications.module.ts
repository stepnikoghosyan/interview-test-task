import { ModuleWithProviders, NgModule } from '@angular/core';
import { ToastrModule } from 'ngx-toastr';

// services
import { NotificationsService } from './services/notifications.service';

@NgModule({
  imports: [
    ToastrModule.forRoot({
      positionClass: 'toast-top-right',
      autoDismiss: true,
      timeOut: 5000,
      extendedTimeOut: 1000,
      tapToDismiss: true,
    }),
  ],
})
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
