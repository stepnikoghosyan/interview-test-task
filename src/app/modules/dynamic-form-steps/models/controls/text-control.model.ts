import { ValidatorFn } from '@angular/forms';

// models
import { IControlBase } from './control-base.model';
import { ControlTypes } from '../control-types.model';

export class TextControl implements IControlBase<string> {
  controlType = ControlTypes.Text;
  defaultValue = '';

  constructor(
    public name: string,
    public label: string,
    public validators: ValidatorFn | ValidatorFn[] | null = [],
  ) {
  }
}
