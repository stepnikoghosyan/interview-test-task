import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Injectable()
export class FormsService {
  public form: FormGroup;

  constructor(
    private readonly formBuilder: FormBuilder,
  ) {
  }
}
