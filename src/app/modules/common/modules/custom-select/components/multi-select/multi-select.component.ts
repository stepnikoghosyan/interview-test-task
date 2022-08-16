import { Component, forwardRef, Input, ViewChild } from '@angular/core';
import { NgOption, NgSelectComponent } from '@ng-select/ng-select';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

// models
import { SelectedValueMulti } from '../../models/selected-value-multi.model';

@Component({
  selector: 'app-multi-select',
  templateUrl: './multi-select.component.html',
  styleUrls: ['./multi-select.component.scss'],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => MultiSelectComponent),
    multi: true,
  }],
})
export class MultiSelectComponent implements ControlValueAccessor {
  @ViewChild(NgSelectComponent) private readonly ngSelectComponent: NgSelectComponent;

  @Input() public items: any[];

  @Input() public labelKey = '';
  @Input() public valueKey = '';
  @Input() public placeholder = 'Select items';
  @Input() public isClearable = true;
  @Input() public showDefaultTemplateForMultiSelect = false;
  @Input() public useModelBindingInsteadOfIdAndValue = false;

  @Input() public notFoundText = 'No data';
  @Input() public badgeKey = 'badge';
  @Input() public hasSelectAndDeselectAllButtons = false;
  @Input() public hasSearch = false;
  @Input() public searchPlaceholder = 'Search';
  @Input() public searchFn: ((term: any, item: any) => boolean) | null = null;
  @Input() public trackByFn: (item: any) => any = (item: any) => item[this.valueKey];

  public _isLoading = false;
  public value: SelectedValueMulti = [];

  @Input()
  public set isLoading(value: boolean) {
    this._isLoading = value;
    if (!!this._isLoading) {
      this.items = [];
    }
  }

  public handleSearchInput(event: any): void {
    this.ngSelectComponent.filter(event && event.target && (event.target as any).value);
  }

  public selectAll(): void {
    if (this.useModelBindingInsteadOfIdAndValue) {
      this.writeValue(this.items);
    } else {
      this.writeValue(this.items.map(item => item[this.valueKey]));
    }
  }

  public deselectAll(): void {
    this.writeValue([]);
  }

  public isItemSelected(item: any, selectedItems: NgOption[]): boolean {
    // @ts-ignore
    return selectedItems.some(option => option.value[this.valueKey] === item[this.valueKey]);
  }

  // Control Value Accessor
  writeValue(value: SelectedValueMulti): void {
    this.value = value || [];
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

  private onChange: Function = function () {
  };
  private onTouch: Function = function () {
  };
}
