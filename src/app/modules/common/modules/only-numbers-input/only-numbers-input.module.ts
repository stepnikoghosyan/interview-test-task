import { NgModule } from '@angular/core';

// directives
import { OnlyNumbersInputDirective } from './directives/only-numbers-input.directive';

@NgModule({
  declarations: [OnlyNumbersInputDirective],
  exports: [OnlyNumbersInputDirective],
})
export class OnlyNumbersInputModule {
}
