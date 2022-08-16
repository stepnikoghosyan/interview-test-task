import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';

// services
import { FormsService } from '../../services/forms.service';

// models
import { ILabelValue } from '../../../common/models/label-value.model';

// configs
import { getGenderDisplayValues } from '../../../common/models/enums/gender.model';
import { getClientGroupDisplayValues } from '../../models/enums/client-group.model';

@Component({
  selector: 'app-client-info',
  templateUrl: './client-info.component.html',
  styleUrls: ['./client-info.component.scss'],
})
export class ClientInfoComponent {
  public form: FormGroup;

  public readonly genderList = getGenderDisplayValues();
  public readonly clientGroupList = getClientGroupDisplayValues();

  // TODO: get data from service
  public coordinatorsList?: ILabelValue<any>[] = [
    {
      label: 'Hopar 1',
      value: 1,
    },
    {
      label: 'Hopar 2',
      value: 2,
    },
    {
      label: 'Hopar 3',
      value: 3,
    },
    {
      label: 'Hopar 4',
      value: 4,
    },
  ];

  constructor(
    private readonly formsService: FormsService,
  ) {
    this.form = formsService.clientInfoForm;
  }
}
