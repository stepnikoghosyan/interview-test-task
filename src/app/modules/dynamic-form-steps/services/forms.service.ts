import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

// services
import { GetDataService } from './get-data.service';

// models
import { Steps } from '../models/steps.model';
import { ICurrentStepData } from '../models/current-step-data.model';

// configs
import { getStepsConfig } from '../configs/steps.config';

// helpers
import { getFullRoute } from '../../common/utils/get-full-route.helper';

@Injectable()
export class FormsService {
  public form: FormGroup;

  public currentStepData$ = new BehaviorSubject<ICurrentStepData | undefined>(undefined);

  private readonly stepsConfig = getStepsConfig();

  constructor(
    private readonly getDataService: GetDataService,
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
    // TODO: implement final step next click

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

  public goToPrevStep(): void {
    const currentStepIndex = this.stepsConfig.findIndex(item => item.route === this.currentStepData$.value?.config?.route);
    if (currentStepIndex > 0) {
      this.router.navigate([getFullRoute(this.stepsConfig[currentStepIndex - 1].route)]);
    }
  }

  public cleanUp(): void {
    this.currentStepData$.next(undefined);
  }
}
