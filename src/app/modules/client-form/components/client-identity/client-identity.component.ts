import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';

// services
import { FormsService } from '../../services/forms.service';

// helpers
import { getDocumentTypeDisplayValues } from '../../models/enums/document-type.model';

@Component({
  selector: 'app-client-identity',
  templateUrl: './client-identity.component.html',
})
export class ClientIdentityComponent {
  public form: FormGroup;

  public readonly documentTypeList = getDocumentTypeDisplayValues().values;

  constructor(private readonly formsService: FormsService) {
    this.form = formsService.clientIdentityForm;
  }
}
