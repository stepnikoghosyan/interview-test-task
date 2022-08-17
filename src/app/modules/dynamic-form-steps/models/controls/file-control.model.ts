import { ValidatorFn } from '@angular/forms';

// models
import { IControlBase } from './control-base.model';
import { ControlTypes } from '../control-types.model';

export class FileControl implements IControlBase<File | null> {
  controlType = ControlTypes.Date;

  constructor(
    public name: string,
    public label: string,
    public defaultValue: File | null = null,
    public validators: ValidatorFn | ValidatorFn[] | null = [],
  ) {
  }
}
