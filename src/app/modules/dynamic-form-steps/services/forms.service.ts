import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

// models
import { IUserData } from '../../common/models/user-data.model';
import { Steps } from '../models/steps.model';
import { ICurrentStepData } from '../models/current-step-data.model';
import { AppRoutes } from '../../../models/enums/app-routes.model';

// configs
import { getStepsConfig } from '../configs/steps.config';

// helpers
import { getFullRoute } from '../../common/utils/get-full-route.helper';
import { getBase64FromFile } from '../utils/file-to-base64.helper';

@Injectable()
export class FormsService {
  public form: FormGroup;

  public currentStepData$ = new BehaviorSubject<ICurrentStepData | undefined>(undefined);

  private readonly stepsConfig = getStepsConfig();

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly router: Router,
  ) {
    this.initForms();
  }

  private initForms(): FormGroup {
    this.form = this.formBuilder.group({});

    this.stepsConfig.forEach((config) => {
      const controlsConfig: { [key: string]: any } = {};

      config.controls.forEach((item) => {
        controlsConfig[item.name] = [item.defaultValue, item.validators];
      });

      const formGroup = this.formBuilder.group(controlsConfig);
      this.form.addControl(config.route, formGroup);
    });

    return this.form;
  }

  public updateCurrentStep(route: Steps): void {
    // tslint:disable:no-non-null-assertion
    if (this.isFirstStep(route) || this.form.get(this.stepsConfig[0].route)!.valid) {
      const value = {
        form: this.form.get(route) as FormGroup,
        config: this.stepsConfig.find(item => item.route === route)!,
      };

      this.currentStepData$.next(value);

      return;
    }

    this.router.navigate([getFullRoute(this.stepsConfig[0].route)]);
  }

  public isFirstStep(step?: Steps): boolean {
    // tslint:disable-next-line:variable-name
    const _step = step || this.currentStepData$.value?.config.route;
    if (!_step) {
      return false;
    }

    return this.stepsConfig[0].route === _step;
  }

  public isLastStep(step?: Steps): boolean {
    // tslint:disable-next-line:variable-name
    const _step = step || this.currentStepData$.value?.config.route;
    if (!_step) {
      return false;
    }

    return this.stepsConfig[this.stepsConfig.length - 1].route === _step;
  }

  public goToNextStep(): void {
    if (this.currentStepData$.value?.form.invalid) {
      this.currentStepData$.value.form.markAllAsTouched();
      return;
    }

    if (!this.currentStepData$.value || !this.currentStepData$.value.config) {
      return;
    }

    // @ts-ignore
    const currentStepIndex = this.stepsConfig.findIndex(item => item.route === this.currentStepData$.value.config.route);
    if (currentStepIndex < this.stepsConfig.length - 1) {
      this.router.navigate([getFullRoute(this.stepsConfig[currentStepIndex + 1].route)]);
    }
  }

  public get formValueToPayload(): Observable<Omit<IUserData, 'id'>> {
    // TODO: convert to config (not doing right now, for taking less time)

    const basicInfoValues = this.form.value[AppRoutes.ClientInfo];
    const addressValues = this.form.value[AppRoutes.ClientAddress];
    const identityValues = this.form.value[AppRoutes.ClientIdentity];

    const data = {
      basicInfo: {
        lastName: basicInfoValues.lastName,
        name: basicInfoValues.name,
        middleName: basicInfoValues.middleName,
        dateOfBirth: basicInfoValues.dateOfBirth,
        phoneNumber: basicInfoValues.phoneNumber,
        gender: basicInfoValues.gender || null,
        clientGroup: basicInfoValues.clientGroup,
        coordinator: basicInfoValues.coordinator,
        doNotSendSMS: !!basicInfoValues.doNotSendSMS,
      },
      address: {
        index: addressValues.index,
        country: addressValues.country,
        area: addressValues.area,
        city: addressValues.city,
        street: addressValues.street,
        house: addressValues.house,
      },
      identity: {
        documentType: identityValues.documentType,
        series: identityValues.series,
        number: identityValues.number,
        issuedBy: identityValues.issuedBy,
        dateOfIssue: identityValues.dateOfIssue,
        file: identityValues.file,
      },
    };

    if (!(identityValues.file instanceof File)) {
      return of(data);
    }

    return getBase64FromFile(identityValues.file)
      .pipe(
        map((result) => {
          return {
            ...data,
            identity: {
              ...data.identity,
              file: result,
            },
          };
        }),
      );
  }

  public goToPrevStep(): void {
    const currentStepIndex = this.stepsConfig.findIndex(item => item.route === this.currentStepData$.value?.config?.route);
    if (currentStepIndex > 0) {
      this.router.navigate([getFullRoute(this.stepsConfig[currentStepIndex - 1].route)]);
    }
  }
}
