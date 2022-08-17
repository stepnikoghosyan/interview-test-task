import { ValidatorFn } from '@angular/forms';

// models
import { IControlBase } from './control-base.model';
import { ControlTypes } from '../control-types.model';

export class NumberControl implements IControlBase<string> {
  controlType = ControlTypes.Number;
  defaultValue = '';

  constructor(
    public name: string,
    public label: string,
    public validators: ValidatorFn | ValidatorFn[] | null = [],
  ) {
  }
}
