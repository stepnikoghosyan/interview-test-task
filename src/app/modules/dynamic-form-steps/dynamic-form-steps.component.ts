import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

// services
import { FormsService } from './services/forms.service';
import { GetDataService } from './services/get-data.service';

// models
import { ControlTypes } from './models/control-types.model';
import { ICurrentStepData } from './models/current-step-data.model';
import { Steps } from './models/steps.model';

@Component({
  selector: 'app-dynamic-form-steps',
  templateUrl: './dynamic-form-steps.component.html',
})
export class DynamicFormStepsComponent implements OnInit, OnDestroy {
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
    } else {
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
