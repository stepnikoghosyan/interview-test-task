import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { switchMap, takeUntil } from 'rxjs/operators';
import { of, Subject } from 'rxjs';
import { ControlTypes } from './models/control-types.model';
import { FormsService } from './services/forms.service';
import { ICurrentStepData } from './models/current-step-data.model';
import { Steps } from './models/steps.model';
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

  public currentStepData?: ICurrentStepData;

  public readonly CONTROL_TYPES = ControlTypes;

  private readonly subscriptions$ = new Subject<void>();

  constructor(
    private readonly formsService: FormsService,
    private readonly getDataService: GetDataService,
    private readonly route: ActivatedRoute,
  ) {
    this.form = formsService.form;
  }

  ngOnInit(): void {
    this.subscribeToRouteChanges();
    this.subscribeToCurrentStepData();
  }

  private subscribeToRouteChanges(): void {
    this.route.paramMap
      .pipe(takeUntil(this.subscriptions$))
      .subscribe((params: ParamMap) => {
        this.formsService.updateCurrentStep(params.get('formStepId') as Steps);
      });
  }

  private subscribeToCurrentStepData(): void {
    this.formsService.currentStepData$
      .pipe(takeUntil(this.subscriptions$))
      .subscribe({
        next: (value) => {
          if (!value) {
            return;
          }

          this.currentStepData = value;
        },
      });
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
    this.formsService.goToNextStep();
  }

  private handlePrevClick(): void {
    this.formsService.goToPrevStep();
  }

  ngOnDestroy(): void {
    this.subscriptions$.next();
    this.subscriptions$.complete();
  }
}
