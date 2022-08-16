import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

// components
import { FileInputComponent } from './components/file-input.component';

// directives
import { FileOrStringToImgSrcDirective } from './directives/file-or-string-to-img-src.directive';

@NgModule({
  declarations: [
    FileInputComponent,
    FileOrStringToImgSrcDirective,
  ],
  imports: [
    CommonModule,
    FontAwesomeModule,
  ],
  exports: [
    FileInputComponent
  ],
})
export class FileInputModule {
}
