import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { getStepsConfig } from './configs/steps.config';
import { ActivatedRoute, NavigationStart, ParamMap, Router } from '@angular/router';
import { filter, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { Steps } from './models/steps.model';
import { getFullRoute } from '../common/utils/get-full-route.helper';
import { IStepConfigItem } from './models/step-config-item.model';
import { DynamicSelectControl } from './models/controls/select-control.model';
import { SelectedValueSingle } from '../common/modules/custom-select/models/selected-value-single.model';
import { SelectedValueMulti } from '../common/modules/custom-select/models/selected-value-multi.model';
import { ControlTypes } from './models/control-types.model';
import { GetDataService } from './services/get-data.service';

@Component({
  selector: 'app-dynamic-form-steps',
  templateUrl: './dynamic-form-steps.component.html',
})
export class DynamicFormStepsComponent implements OnInit, OnDestroy {
  // Approach 1
  // 1. Get all data from API

  // Approach 2
  // 1. Have all configs in Client side
  // 2. Request data for Select inputs in component, after specific step is loaded
  // 3. Each select config has an endpoint for request and a function for converting data from response to ILabelValue

  // Approach 3
  // 1. get select data when requested

  public form: FormGroup;

  public currentStepForm?: FormGroup;
  public currentStepConfig?: IStepConfigItem;

  private readonly stepsConfig = getStepsConfig();

  public readonly CONTROL_TYPES = ControlTypes;

  private readonly subscriptions$ = new Subject<void>();
  private readonly getDataSubscriptions$ = new Subject<void>();

  constructor(
    private readonly getDataService: GetDataService,
    private readonly formBuilder: FormBuilder,
    private readonly route: ActivatedRoute,
    private readonly router: Router,
  ) {
    this.initForms();
  }

  ngOnInit(): void {
    this.subscribeToRouteChanges();
  }

  private initForms(): void {
    this.form = this.formBuilder.group({});

    (window as any).hopar = this.form;

    this.stepsConfig.forEach((config) => {
      const controlsConfig: { [key: string]: any } = {};
      const dependants: { source: DynamicSelectControl<any, any>, dependsOn: string }[] = [];

      config.controls.forEach((item) => {
        controlsConfig[item.name] = [item.defaultValue, item.validators];

        if (item instanceof DynamicSelectControl) {
          if (item.isDependantOnAnotherControl) {
            dependants.push({
              source: item as DynamicSelectControl<any, any>,
              dependsOn: item.isDependantOnAnotherControl,
            });
          } else {
            this.getDataService.getData(item.requestData)
              .pipe(takeUntil(this.getDataSubscriptions$))
              .subscribe({
                next: (res) => item.items = res,
              });
          }
        }
      });

      const formGroup = this.formBuilder.group(controlsConfig);
      this.form.addControl(config.route, formGroup);

      dependants.forEach((item) => {
        const formCtrl = formGroup.get(item.dependsOn);

        if (formCtrl) {
          formCtrl.valueChanges
            .pipe(takeUntil(this.subscriptions$))
            .subscribe({
              next: (value: SelectedValueSingle | SelectedValueMulti) => {
                if (!value || !value.length) {
                  item.source.items = [];
                  return;
                }

                item.source.items = undefined;

                let requestBody = value;
                if ('getPostBody' in item.source.requestData) {
                  // @ts-ignore
                  requestBody = item.source.requestData.getPostBody(value);
                }

                this.getDataService.getData({
                  ...item.source.requestData,
                  postBody: requestBody,
                })
                  .pipe(takeUntil(this.getDataSubscriptions$))
                  .subscribe({
                    next: (response) => {
                      item.source.items = response;
                    },
                    error: () => {
                      item.source.items = [];
                    },
                  });
              },
            });
        }
      });
    });
  }

  private subscribeToRouteChanges(): void {
    this.route.paramMap
      .pipe(takeUntil(this.subscriptions$))
      .subscribe((params: ParamMap) => {
        const formStepId = params.get('formStepId') as Steps;

        if (this.isFirstStep(formStepId)) {
          this.currentStepForm = this.form.get(formStepId) as FormGroup;
          this.currentStepConfig = this.stepsConfig.find(item => item.route === formStepId);
          return;
        }

        // Check if 1st step form is valid
        if (this.form.get(this.stepsConfig[0].route)?.valid) {
          this.currentStepForm = this.form.get(formStepId) as FormGroup;
          this.currentStepConfig = this.stepsConfig.find(item => item.route === formStepId);
          return;
        }

        this.router.navigate([getFullRoute(this.stepsConfig[0].route)]);
      });

    this.router.events
      .pipe(filter(e => e instanceof NavigationStart))
      .subscribe({
        next: () => {
          // Cancel all requests made in prev step
          this.getDataSubscriptions$.next();
        },
      });
  }

  private isFirstStep(step: Steps): boolean {
    return this.stepsConfig[0].route === step;
  }

  private isLastStep(step: Steps): boolean {
    return this.stepsConfig[this.stepsConfig.length - 1].route === step;
  }

  public handleNavigation(event: 'next' | 'prev'): void {
    if (event === 'next') {
      this.handleNextClick();
    }

    if (event === 'prev') {
      this.handlePrevClick();
    }
  }

  private handleNextClick(): void {
    // TODO: implement final step next click

    if (this.currentStepForm?.invalid) {
      this.currentStepForm.markAllAsTouched();
      return;
    }

    const currentStepIndex = this.stepsConfig.findIndex(item => item.route === this.currentStepConfig?.route);
    if (currentStepIndex < this.stepsConfig.length - 1) {
      this.router.navigate([getFullRoute(this.stepsConfig[currentStepIndex + 1].route)]);
    }
  }

  private handlePrevClick(): void {
    const currentStepIndex = this.stepsConfig.findIndex(item => item.route === this.currentStepConfig?.route);
    if (currentStepIndex > 0) {
      this.router.navigate([getFullRoute(this.stepsConfig[currentStepIndex - 1].route)]);
    }
  }

  ngOnDestroy(): void {
    this.subscriptions$.next();
    this.subscriptions$.complete();
  }
}
