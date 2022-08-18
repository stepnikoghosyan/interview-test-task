import { FormGroup } from '@angular/forms';

// models
import { IStepConfigItem } from './step-config-item.model';

export interface ICurrentStepData {
  form: FormGroup;
  config: IStepConfigItem;
}
