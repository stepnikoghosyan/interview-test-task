import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

// modules
import { DynamicFormStepsRoutingModule } from './dynamic-form-steps-routing.module';
import { CustomFormModule } from '../common/modules/custom-form/custom-form.module';
import { CustomDatePickerModule } from '../common/modules/date-select/custom-date-picker.module';
import { CustomSelectModule } from '../common/modules/custom-select/custom-select.module';
import { FileInputModule } from '../common/modules/file-input/file-input.module';
import { OnlyNumbersInputModule } from '../common/modules/only-numbers-input/only-numbers-input.module';

// services
import { FormsService } from './services/forms.service';

// components
import { DynamicFormStepsComponent } from './dynamic-form-steps.component';
import { NavigationButtonsComponent } from './components/navigation-buttons/navigation-buttons.component';
import { ProfileComponent } from './components/profile/profile.component';

@NgModule({
  declarations: [
    DynamicFormStepsComponent,
    NavigationButtonsComponent,
    ProfileComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    DynamicFormStepsRoutingModule,
    CustomFormModule,
    CustomDatePickerModule,
    CustomSelectModule,
    OnlyNumbersInputModule,
    FileInputModule,
  ],
  providers: [
    FormsService,
  ],
})
export class DynamicFormStepsModule {
}
