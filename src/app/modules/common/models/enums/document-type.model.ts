import { DisplayValues } from '../display-values.model';

export enum DocumentType {
  Passport = 'Passport',
  Birth = 'Birth ',
  Certificate = 'Certificate',
  Driving = 'Driving',
  License = 'License',
}

export function getDocumentTypeDisplayValues(): DisplayValues<DocumentType> {
  return {
    mapping: {
      [DocumentType.Passport]: 'DocumentType',
      [DocumentType.Birth]: 'DocumentType',
      [DocumentType.Certificate]: 'DocumentType',
      [DocumentType.Driving]: 'DocumentType',
      [DocumentType.License]: 'DocumentType',
    },
    values: [
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
        value: DocumentType.License,
      },
    ],
  };
}
