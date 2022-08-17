import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { getStepsConfig } from '../configs/steps.config';
import { GetDataService } from './get-data.service';
import { Steps } from '../models/steps.model';
import { getFullRoute } from '../../common/utils/get-full-route.helper';
import { Router } from '@angular/router';
import { ICurrentStepData } from '../models/current-step-data.model';
import { DynamicSelectControl } from '../models/controls/select-control.model';
import { catchError, map, switchMap, takeUntil, tap } from 'rxjs/operators';
import { SelectedValueSingle } from '../../common/modules/custom-select/models/selected-value-single.model';
import { SelectedValueMulti } from '../../common/modules/custom-select/models/selected-value-multi.model';
import { BehaviorSubject, forkJoin, Observable, of } from 'rxjs';
import { ILabelValue } from '../../common/models/label-value.model';

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

    private isFirstStep(step: Steps): boolean {
    return this.stepsConfig[0].route === step;
  }

  private isLastStep(step: Steps): boolean {
    return this.stepsConfig[this.stepsConfig.length - 1].route === step;
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
