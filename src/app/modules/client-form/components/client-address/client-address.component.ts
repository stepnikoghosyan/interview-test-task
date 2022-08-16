import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';

// services
import { FormsService } from '../../services/forms.service';
import { ILabelValue } from '../../../common/models/label-value.model';

@Component({
  selector: 'app-client-address',
  templateUrl: './client-address.component.html',
})
export class ClientAddressComponent {
  public form: FormGroup;

  // TODO: get data from service
  public countriesList?: ILabelValue<any>[] = [
    {
      label: 'Armenia',
      value: 1,
    },
    {
      label: 'USA',
      value: 2,
    },
    {
      label: 'UK',
      value: 3,
    },
  ];

  // TODO: get data from service
  public citiesList?: ILabelValue<any>[] = [
    {
      label: 'Yerevan',
      value: 1,
    },
    {
      label: 'Vagharshapat',
      value: 2,
    },
    {
      label: 'Vanadzor',
      value: 3,
    },
  ];

  constructor(
    private readonly formsService: FormsService,
  ) {
    this.form = formsService.clientAddressForm;
  }
}
