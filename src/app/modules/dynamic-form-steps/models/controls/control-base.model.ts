import { ValidatorFn } from '@angular/forms';
import { ControlTypes } from '../control-types.model';

export interface IControlBase<T> {
  name: string;
  label: string;
  defaultValue: T;
  validators?: ValidatorFn | ValidatorFn[] | null;
  controlType: ControlTypes;
}
