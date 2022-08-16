import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

// modules
import { ClientFormRoutingModule } from './client-form-routing.module';
import { CustomFormModule } from '../common/modules/custom-form/custom-form.module';
import { CustomSelectModule } from '../common/modules/custom-select/custom-select.module';

// services
import { FormsService } from './services/forms.service';

// components
import { ClientFormComponent } from './client-form.component';
import { ClientInfoComponent } from './components/client-info/client-info.component';
import { ClientAddressComponent } from './components/client-address/client-address.component';
import { ClientIdentityComponent } from './components/client-identity/client-identity.component';
import { NgbDatepickerModule } from '@ng-bootstrap/ng-bootstrap';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { CustomDatePickerModule } from '../common/modules/date-select/custom-date-picker.module';
import { OnlyNumbersInputModule } from '../common/modules/only-numbers-input/only-numbers-input.module';

@NgModule({
  declarations: [
    ClientFormComponent,
    ClientInfoComponent,
    ClientAddressComponent,
    ClientIdentityComponent
  ],
  imports: [
    ReactiveFormsModule,
    ClientFormRoutingModule,
    CustomFormModule,
    CustomSelectModule,
    NgbDatepickerModule,
    FontAwesomeModule,
    CustomDatePickerModule,
    OnlyNumbersInputModule,
  ],
  providers: [
    FormsService,
  ],
})
export class ClientFormModule {
}
