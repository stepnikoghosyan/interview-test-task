import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

// validators
import { notOnlySpacesValidator } from '../../common/validators/not-only-spaces.validator';
import { onlyNumbersValidator } from '../../common/validators/only-numbers.validator';

@Injectable()
export class FormsService {
  public clientInfoForm: FormGroup;
  public clientAddressForm: FormGroup;
  public clientIdentityForm: FormGroup;

  constructor(
    private readonly formBuilder: FormBuilder,
  ) {
    this.clientInfoForm = this.initAndGetClientInfoForm();
    this.clientAddressForm = this.initAndGetClientAddressForm();
    this.clientIdentityForm = this.initAndGetClientIdentityForm();

    (window as any).form1 = this.clientInfoForm;
    (window as any).form2 = this.clientAddressForm;
    (window as any).form3 = this.clientIdentityForm;
  }

  private initAndGetClientInfoForm(): FormGroup {
    return this.formBuilder.group({
      lastName: ['', [Validators.required, notOnlySpacesValidator]],
      name: ['', [Validators.required, notOnlySpacesValidator]],
      middleName: ['', [Validators.required, notOnlySpacesValidator]],
      dateOfBirth: [new Date(), [Validators.required]],
      phoneNumber: ['', [Validators.required, onlyNumbersValidator]],
      gender: [null],
      clientGroup: [null, [Validators.required]],
      coordinator: [null],
      doNotSendSMS: [false],
    });
  }

  private initAndGetClientAddressForm(): FormGroup {
    return this.formBuilder.group({});
  }

  private initAndGetClientIdentityForm(): FormGroup {
    return this.formBuilder.group({});
  }
}
