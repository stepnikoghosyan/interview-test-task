import { Component, forwardRef, Input, ViewChild } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { NgSelectComponent } from '@ng-select/ng-select';

// models
import { SelectedValueSingle } from '../../models/selected-value-single.model';

@Component({
  selector: 'app-single-select',
  templateUrl: './single-select.component.html',
  styleUrls: ['./single-select.component.scss'],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => SingleSelectComponent),
    multi: true,
  }],
})
export class SingleSelectComponent implements ControlValueAccessor {
  @ViewChild(NgSelectComponent) public ngSelectComponent: NgSelectComponent;

  @Input() public items: any[] = [];

  @Input() public labelKey = '';
  @Input() public valueKey = '';
  @Input() public placeholder = 'Select items';
  @Input() public isClearable = true;
  @Input() public useModelBindingInsteadOfIdAndValue = false;

  @Input() public notFoundText = 'No data';
  @Input() public hasSelectAndDeselectAllButtons = false;
  @Input() public hasSearch = false;
  @Input() public searchPlaceholder = 'Search';
  @Input() public searchFn: ((term: any, item: any) => boolean) | null = null;
  @Input() public trackByFn: (item: any) => any = (item: any) => item[this.valueKey];

  @Input()
  public set isLoading(value: boolean) {
    this._isLoading = value;
    if (this._isLoading) {
      this.items = [];
    }
  }

  public _isLoading = false;
  public value: SelectedValueSingle = null;

  public handleSearchInput(event: any): void {
    this.ngSelectComponent.filter(event && event.target && (event.target as any).value);
  }

  // Control Value Accessor
  writeValue(value: SelectedValueSingle): void {
    this.value = value;
    this.emitChange();
  }

  public registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  public registerOnTouched(fn: any): void {
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
