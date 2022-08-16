import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgbDatepickerModule } from '@ng-bootstrap/ng-bootstrap';

// components
import { CustomDatePickerComponent } from './components/custom-date-picker.component';

@NgModule({
  declarations: [
    CustomDatePickerComponent,
  ],
  imports: [
    ReactiveFormsModule,
    FontAwesomeModule,
    NgbDatepickerModule,
  ],
  exports: [
    CustomDatePickerComponent,
  ],
})
export class CustomDatePickerModule {
}
