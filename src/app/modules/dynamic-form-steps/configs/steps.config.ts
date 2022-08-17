import { Validators } from '@angular/forms';

// models
import { AppRoutes } from '../../../models/enums/app-routes.model';
import { IStepConfigItem } from '../models/step-config-item.model';
import { TextControl } from '../models/controls/text-control.model';
import { DateControl } from '../models/controls/date-control.model';
import { NumberControl } from '../models/controls/number-control.model';
import { CheckboxControl } from '../models/controls/checkbox-control.model';
import { FileControl } from '../models/controls/file-control.model';
import { DynamicSelectControl, StaticSelectControl } from '../models/controls/select-control.model';
import { SelectedValueSingle } from '../../common/modules/custom-select/models/selected-value-single.model';
import { getGenderDisplayValues } from '../../common/models/enums/gender.model';
import { getClientGroupDisplayValues } from '../../client-form/models/enums/client-group.model';
import { getDocumentTypeDisplayValues } from '../../client-form/models/enums/document-type.model';

// validators
import { notOnlySpacesValidator } from '../../common/validators/not-only-spaces.validator';
import { onlyNumbersValidator } from '../../common/validators/only-numbers.validator';
import { imageMimeTypeValidator } from '../../common/validators/image-mime-type.validator';
import { fileSizeValidator } from '../../common/validators/file-size.validator';

// normalizers
import { normalizeCoordinatorResponse } from '../normalizers/coordinator.normalizer';
import { normalizeCountryResponse } from '../normalizers/country.normalizer';
import { normalizeCityResponse } from '../normalizers/city.normalizer';

export function getStepsConfig(): Array<IStepConfigItem> {
  return [
    {
      route: AppRoutes.ClientInfo,
      pageTitle: 'Client Info',
      controls: [
        new TextControl('lastName', 'Last Name', [Validators.required, notOnlySpacesValidator]),
        new TextControl('name', 'Name', [Validators.required, notOnlySpacesValidator]),
        new TextControl('middleName', 'Middle Name', [Validators.required, notOnlySpacesValidator]),
        new DateControl('dateOfBirth', 'Date of Birth', [Validators.required]),
        new NumberControl('phoneNumber', 'Phone Number', [Validators.required, notOnlySpacesValidator]),
        new StaticSelectControl('gender', 'Gender', getGenderDisplayValues().values),
        new StaticSelectControl('clientGroup', 'Client Group', getClientGroupDisplayValues().values, true, [], [Validators.required]),
        new DynamicSelectControl(
          'coordinator',
          'Coordinator',
          {
            endpoint: 'https://randomuser.me/api/',
            method: 'GET',
            queryParams: {
              page: 1,
              results: 50,
            },
            dataNormalizerFn: normalizeCoordinatorResponse,
          },
        ),
        new CheckboxControl('doNotSendSMS', 'Do not Send SMS'),
      ],
    },
    {
      route: AppRoutes.ClientAddress,
      pageTitle: 'Client Address',
      controls: [
        new NumberControl('index', 'Index', [onlyNumbersValidator]),
        new DynamicSelectControl(
          'country',
          'Country',
          {
            endpoint: 'https://countriesnow.space/api/v0.1/countries',
            method: 'GET',
            dataNormalizerFn: normalizeCountryResponse,
          },
          false,
          undefined,
          [Validators.required],
        ),
        new TextControl('area', 'Area'),
        new DynamicSelectControl(
          'city',
          'City',
          {
            endpoint: 'https://countriesnow.space/api/v0.1/countries/cities',
            method: 'POST',
            getPostBody: (value: SelectedValueSingle) => ({ country: value }),
            dataNormalizerFn: normalizeCityResponse,
          },
          true,
          undefined,
          [Validators.required],
          'country',
        ),
        new TextControl('street', 'Street'),
        new TextControl('house', 'House'),
      ],
    },
    {
      route: AppRoutes.ClientIdentity,
      pageTitle: 'Client Identity',
      controls: [
        new StaticSelectControl('documentType', 'Document Type', getDocumentTypeDisplayValues().values, false, null, [Validators.required]),
        new TextControl('series', 'Series'),
        new NumberControl('number', 'Number', [Validators.required, onlyNumbersValidator]),
        new TextControl('issuedBy', 'Issued By'),
        new DateControl('dateOfIssue', 'Date of Issue', [Validators.required]),
        new FileControl('file', 'File', null, [imageMimeTypeValidator(['jpg', 'jpeg', 'png']), fileSizeValidator()]),
      ],
    },
  ];
}
