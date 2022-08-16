import { ILabelValue } from '../../../common/models/label-value.model';

export enum DocumentType {
  Passport = 'Passport',
  Birth = 'Birth ',
  Certificate = 'Certificate',
  Driving = 'Driving',
  license = 'license',
}

export function getDocumentTypeDisplayValues(): Array<ILabelValue<DocumentType>> {
  return [
    {
      label: 'Passport',
      value: DocumentType.Passport,
    },
    {
      label: 'Birth',
      value: DocumentType.Birth,
    },
    {
      label: 'Certificate',
      value: DocumentType.Certificate,
    },
    {
      label: 'Driving',
      value: DocumentType.Driving,
    },
    {
      label: 'license',
      value: DocumentType.license,
    },
  ];
}
