import { Component, forwardRef } from '@angular/core';
import { NgbDate, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

// services
import { CustomDateParserFormatter } from '../services/date-formatter.service';

@Component({
  selector: 'app-date-picker',
  templateUrl: './custom-date-picker.component.html',
  providers: [
    CustomDateParserFormatter,
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CustomDatePickerComponent),
      multi: true,
    }
  ],
})
export class CustomDatePickerComponent implements ControlValueAccessor {
  public value: Date | null = null;
  public displayValue: string;

  constructor(private readonly customDateParserFormatter: CustomDateParserFormatter) {
  }

  public handleDateSelect(data: NgbDate): void {
    this.writeValue(data);
  }

  // Control Value Accessor
  writeValue(value: NgbDateStruct | null): void {
    let ngbValue: NgbDateStruct | null = value;

    if (value instanceof Date) {
      ngbValue = {
        day: value.getDate(),
        month: value.getMonth() + 1,
        year: value.getFullYear(),
      };
    }

    this.value = ngbValue && new Date(ngbValue.year, ngbValue.month, ngbValue.day) || null;
    this.displayValue = this.customDateParserFormatter.format(ngbValue);
    this.emitChange();
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouch = fn;
  }

  private emitChange(): void {
    this.onChange(this.value);
    this.onTouch(this.value);
  }

  private onChange: Function = function() {
  };
  private onTouch: Function = function() {
  };
}
