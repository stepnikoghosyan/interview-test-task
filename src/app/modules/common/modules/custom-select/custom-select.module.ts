import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';

// components
import { SingleSelectComponent } from './components/single-select/single-select.component';
import { MultiSelectComponent } from './components/multi-select/multi-select.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@NgModule({
  declarations: [
    SingleSelectComponent,
    MultiSelectComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    NgSelectModule,
    FontAwesomeModule,
  ],
  exports: [
    SingleSelectComponent,
    MultiSelectComponent,
  ],
})
export class CustomSelectModule {
}
