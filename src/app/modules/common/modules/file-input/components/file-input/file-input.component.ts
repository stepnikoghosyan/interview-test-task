import { Component, forwardRef, Input } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-file-input',
  templateUrl: './file-input.component.html',
  styleUrls: ['./file-input.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => FileInputComponent),
      multi: true,
    }
  ]
})
export class FileInputComponent implements ControlValueAccessor {
  @Input() public previewImage = true;

  public value: File | string | null;

  public onFileChange(event: Event): void {
    const files = (event.target as HTMLInputElement).files;
    if (!!files && files.length > 0) {
      this.writeValue(files[0]);
    }
  }

  public clearFileInput(): void {
    this.writeValue(null);
  }

  // Control Value Accessor
  writeValue(value: File | string | null): void {
    this.value = value;
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
