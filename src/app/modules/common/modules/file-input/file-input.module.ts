import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

// components
import { FileInputComponent } from './components/file-input/file-input.component';
import { FilePreviewComponent } from './components/file-preview/file-preview.component';

// directives
import { FileOrStringToImgSrcDirective } from './directives/file-or-string-to-img-src.directive';

@NgModule({
  declarations: [
    FileInputComponent,
    FilePreviewComponent,
    FileOrStringToImgSrcDirective,
  ],
  imports: [
    CommonModule,
    FontAwesomeModule,
  ],
  exports: [
    FileInputComponent,
    FilePreviewComponent,
  ],
})
export class FileInputModule {
}
