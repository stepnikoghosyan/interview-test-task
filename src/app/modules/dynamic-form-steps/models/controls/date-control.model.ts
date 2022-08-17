import { ValidatorFn } from '@angular/forms';

// models
import { IControlBase } from './control-base.model';
import { ControlTypes } from '../control-types.model';

export class DateControl implements IControlBase<Date | null> {
  controlType = ControlTypes.Date;

  constructor(
    public name: string,
    public label: string,
    public validators: ValidatorFn | ValidatorFn[] | null = [],
    public defaultValue: Date | null = new Date(),
  ) {
  }
}
