import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-file-preview',
  templateUrl: './file-preview.component.html',
})
export class FilePreviewComponent {
  @Input() public imageSrc: File | string | null;
  @Output() public clearFileInput = new EventEmitter<void>();

  public handleClearFileInput(): void {
    this.clearFileInput.emit();
  }
}
