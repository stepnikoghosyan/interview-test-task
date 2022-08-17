import { Directive, Input, OnDestroy, OnInit } from '@angular/core';
import {
  DynamicSelectControl,
  SelectControl,
} from '../../../../dynamic-form-steps/models/controls/select-control.model';
import { switchMap, takeUntil } from 'rxjs/operators';
import { SelectedValueSingle } from '../models/selected-value-single.model';
import { SelectedValueMulti } from '../models/selected-value-multi.model';
import { of, Subject } from 'rxjs';
import { GetDataService } from '../../../../dynamic-form-steps/services/get-data.service';
import { FormsService } from '../../../../dynamic-form-steps/services/forms.service';

@Directive({
  selector: '[appDynamicSelect]',
})
export class DynamicSelectDirective implements OnInit, OnDestroy {
  @Input() public control: SelectControl<any>;

  private readonly subscriptions$ = new Subject<void>();

  constructor(
    private readonly getDataService: GetDataService,
    private readonly formsService: FormsService,
  ) {
  }

  ngOnInit(): void {
    if (!this.control.hasDynamicData) {
      return;
    }

    const control = this.control as DynamicSelectControl<any, any>;

    if (control.isDependantOnAnotherControl) {
      this.subscribeToSourceControlValueChanges();
    } else {
      control.items = undefined;

      this.getDataService.getData(control.requestData)
        .pipe(takeUntil(this.subscriptions$))
        .subscribe({
          next: (response) => {
            control.items = response;
          },
          error: () => control.items = [],
        });
    }
  }

  private subscribeToSourceControlValueChanges(): void {
    const control = this.control as DynamicSelectControl<any, any>;

    const form = this.formsService.currentStepData$.value?.form;
    if (!form) {
      return;
    }

    const sourceControlName = (control as DynamicSelectControl<any, any>).isDependantOnAnotherControl;
    if (!sourceControlName) {
      return;
    }

    const formCtrl = form.get(sourceControlName);
    if (!formCtrl) {
      return;
    }

    const currentFormCtrl = form.get(control.name);
    if (!currentFormCtrl) {
      return;
    }

    formCtrl.valueChanges
      .pipe(
        switchMap((selectedValue: SelectedValueSingle | SelectedValueMulti) => {
          if (!selectedValue) {
            return of([]);
          }

          control.items = undefined;
          currentFormCtrl.patchValue(control.isMultiSelect && [] || undefined);

          let requestBody = selectedValue;
          if ('getPostBody' in control.requestData) {
            // @ts-ignore
            requestBody = control.requestData.getPostBody(selectedValue);
          }

          return this.getDataService.getData({
            ...control.requestData,
            postBody: requestBody,
          });
        }),
        takeUntil(this.subscriptions$)
      )
      .subscribe({
        next: (response) => control.items = response || [],
        error: () => control.items = [],
      });
  }

  ngOnDestroy(): void {
    this.subscriptions$.next();
    this.subscriptions$.complete();
  }
}
