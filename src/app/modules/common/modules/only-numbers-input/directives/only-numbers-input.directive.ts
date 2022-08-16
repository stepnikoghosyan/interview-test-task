import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appOnlyNumbers]',
})
export class OnlyNumbersInputDirective {
  @HostListener('keydown', ['$event'])
  onKeyDown(e: KeyboardEvent): void {
    if (
      [46, 8, 9, 27, 13, 110, 190].indexOf(e.keyCode) !== -1 || // Allow: Delete, Backspace, Tab, Escape, Enter, Numpad Decimal, Period
      (e.keyCode === 65 && e.ctrlKey) || // Allow: Ctrl+A
      (e.keyCode === 67 && e.ctrlKey) || // Allow: Ctrl+C
      (e.keyCode === 86 && e.ctrlKey) || // Allow: Ctrl+V
      (e.keyCode === 88 && e.ctrlKey) || // Allow: Ctrl+X
      (e.keyCode === 65 && e.metaKey) || // Allow: Cmd+A (Mac)
      (e.keyCode === 67 && e.metaKey) || // Allow: Cmd+C (Mac)
      (e.keyCode === 86 && e.metaKey) || // Allow: Cmd+V (Mac)
      (e.keyCode === 88 && e.metaKey) || // Allow: Cmd+X (Mac)
      (e.keyCode >= 35 && e.keyCode <= 39) // Allow: Home, End, Left, Right
    ) {
      // let it happen, don't do anything
      return;
    }
    // Block if not numeric
    if (
      (e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) &&
      (e.keyCode < 96 || e.keyCode > 105)
    ) {
      e.preventDefault();
    }
  }

  @HostListener('paste', ['$event'])
  onPaste(event: ClipboardEvent): void {
    event.preventDefault();
    const pastedInput = event.clipboardData
                                     ?.getData('text/plain')
                                     .replace(/\D/g, ''); // get a digit-only string
    document.execCommand('insertText', false, pastedInput || '');
  }

  @HostListener('drop', ['$event'])
  onDrop(event: DragEvent): void {
    event.preventDefault();
    const textData = event.dataTransfer?.getData('text').replace(/\D/g, '');
    this.elRef.nativeElement.focus();
    document.execCommand('insertText', false, textData || '');
  }

  constructor(public elRef: ElementRef) {
  }
}
