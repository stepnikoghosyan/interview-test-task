import { ValidatorFn } from '@angular/forms';

// models
import { IControlBase } from './control-base.model';
import { ControlTypes } from '../control-types.model';

export class CheckboxControl implements IControlBase<boolean> {
  controlType = ControlTypes.Checkbox;

  constructor(
    public name: string,
    public label: string,
    public validators: ValidatorFn | ValidatorFn[] | null = [],
    public defaultValue: boolean = false,
  ) {
  }
}
