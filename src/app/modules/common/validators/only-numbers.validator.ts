import { AbstractControl, ValidationErrors } from '@angular/forms';

export function onlyNumbersValidator(control: AbstractControl): ValidationErrors | null {
  if (!control) {
    return null;
  }

  if (!control.value) {
    return null;
  }

  return /^[0-9]*$/.test(control.value) ? null : { onlyNumbers: true };
}
