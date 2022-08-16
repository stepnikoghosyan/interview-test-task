import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

// services
import { NotificationsService } from '../../common/modules/notifications/services/notifications.service';

// models
import { AppRoutes } from '../../../models/enums/app-routes.model';
import { FormSteps } from '../models/form-steps.model';
import { DocumentType } from '../models/enums/document-type.model';
import { NotificationTypes } from '../../common/modules/notifications/models/notification-types.model';
import { IUserData } from '../models/user-data.model';

// helpers
import { getFullRoute } from '../../common/utils/get-full-route.helper';

// validators
import { notOnlySpacesValidator } from '../../common/validators/not-only-spaces.validator';
import { onlyNumbersValidator } from '../../common/validators/only-numbers.validator';
import { imageMimeTypeValidator } from '../../common/validators/image-mime-type.validator';
import { fileSizeValidator } from '../../common/validators/file-size.validator';

@Injectable()
export class FormsService {
  public clientInfoForm: FormGroup;
  public clientAddressForm: FormGroup;
  public clientIdentityForm: FormGroup;

  private currentStep: FormSteps = AppRoutes.ClientInfo;

  public isProfilePage = false;

  private readonly stepsToFormMapping: { [key in FormSteps]: FormGroup };

  constructor(
    private readonly notificationsService: NotificationsService,
    private readonly formBuilder: FormBuilder,
    private readonly router: Router,
  ) {
    this.clientInfoForm = this.initAndGetClientInfoForm();
    this.clientAddressForm = this.initAndGetClientAddressForm();
    this.clientIdentityForm = this.initAndGetClientIdentityForm();

    this.stepsToFormMapping = {
      [AppRoutes.ClientInfo]: this.clientInfoForm,
      [AppRoutes.ClientAddress]: this.clientAddressForm,
      [AppRoutes.ClientIdentity]: this.clientIdentityForm,
    };

    // In case you want to test fast
    // this.clientInfoForm.patchValue({
    //   lastName: 'Nikoghosyan',
    //   name: 'Stepan',
    //   middleName: 'Styop',
    //   dateOfBirth: new Date(),
    //   phoneNumber: '123456789',
    //   gender: Gender.Male,
    //   clientGroup: [ClientGroup.New],
    //   coordinator: 1,
    //   doNotSendSMS: false,
    // });
    //
    // this.clientAddressForm.patchValue({
    //   index: '123456789',
    //   country: 1,
    //   area: 'dsa',
    //   city: 1,
    //   street: 'asd',
    //   house: 'dsa',
    // });
    //
    // this.clientIdentityForm.patchValue({
    //   documentType: DocumentType.Passport,
    //   series: 'some series 123j',
    //   number: '19208142',
    //   issuedBy: '543',
    //   dateOfIssue: new Date(),
    //   file: null,
    // });
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
    return this.formBuilder.group({
      index: ['', onlyNumbersValidator],
      country: ['', Validators.required],
      area: [''],
      city: ['', [Validators.required]],
      street: [''],
      house: [''],
    });
  }

  private initAndGetClientIdentityForm(): FormGroup {
    return this.formBuilder.group({
      documentType: [DocumentType.Passport, [Validators.required]],
      series: [''],
      number: ['', [Validators.required, onlyNumbersValidator]],
      issuedBy: [''],
      dateOfIssue: ['', Validators.required],
      file: [null, [imageMimeTypeValidator(['jpg', 'jpeg', 'png']), fileSizeValidator]],
    });
  }

  public get isFirstStep(): boolean {
    return this.currentStep === AppRoutes.ClientInfo;
  }

  public get isLastStep(): boolean {
    return this.currentStep === AppRoutes.ClientIdentity;
  }

  public goToPrevStep(): void {
    if (this.isFirstStep) {
      return;
    }

    let prevStep: FormSteps | null = null;
    switch (this.currentStep) {
      case AppRoutes.ClientAddress:
        prevStep = AppRoutes.ClientInfo;
        break;
      case AppRoutes.ClientIdentity:
        prevStep = AppRoutes.ClientAddress;
        break;
    }

    if (!prevStep) {
      return;
    }

    this.currentStep = prevStep;
    this.router.navigate([getFullRoute(prevStep)]);
  }

  public goToNextStep(): void {
    const form = this.stepsToFormMapping[this.currentStep];
    if (!form) {
      return;
    }

    form.markAllAsTouched();
    if (form.invalid) {
      return;
    }

    if (this.isLastStep) {
      this.goToProfilePage();
      return;
    }

    let nextStep: FormSteps | AppRoutes.CreatedClient | null = null;
    switch (this.currentStep) {
      case AppRoutes.ClientInfo:
        nextStep = AppRoutes.ClientAddress;
        break;
      case AppRoutes.ClientAddress:
        nextStep = AppRoutes.ClientIdentity;
        break;
    }

    if (!nextStep) {
      return;
    }

    this.currentStep = nextStep as FormSteps;
    this.router.navigate([getFullRoute(nextStep)]);
  }

  public allowNavigationTo(step: FormSteps | AppRoutes.CreatedClient): boolean {
    if (step === AppRoutes.ClientInfo) {
      return true;
    }

    let previousStepForm: FormGroup;

    switch (step) {
      case AppRoutes.ClientAddress:
        previousStepForm = this.clientInfoForm;
        break;
      case AppRoutes.ClientIdentity:
        previousStepForm = this.clientAddressForm;
        break;
      case AppRoutes.CreatedClient:
        previousStepForm = this.clientIdentityForm;
        break;
    }

    previousStepForm.markAllAsTouched();
    return previousStepForm.valid;
  }

  private goToProfilePage(): void {
    this.currentStep = AppRoutes.ClientInfo;
    this.isProfilePage = true;

    this.notificationsService.showNotification({
      title: 'Success',
      message: 'Profile Created',
      type: NotificationTypes.SUCCESS,
    });

    this.router.navigate([getFullRoute(AppRoutes.CreatedClient)]);
  }

  public get formValues(): IUserData {
    return {
      basicInfo: this.clientInfoForm.value,
      address: this.clientAddressForm.value,
      identity: this.clientIdentityForm.value,
    };
  }

  public startOver(): void {
    this.clientInfoForm.reset();
    this.clientAddressForm.reset();
    this.clientIdentityForm.reset();
    this.isProfilePage = false;
    this.router.navigate([getFullRoute(AppRoutes.ClientInfo)]);
  }
}
