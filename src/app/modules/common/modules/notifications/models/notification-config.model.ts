import { IndividualConfig } from 'ngx-toastr';

// models
import { NotificationTypes } from './notification-types.model';

export interface INotificationConfig {
  type: NotificationTypes;
  message: string | string[];
  title?: string;
  overrideConfig?: Partial<IndividualConfig>;
}
