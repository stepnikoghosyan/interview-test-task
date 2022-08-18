import { Gender } from './enums/gender.model';
import { ClientGroup } from './enums/client-group.model';
import { ILabelValue } from './label-value.model';
import { DocumentType } from './enums/document-type.model';

export interface IUserData {
  id: number;

  basicInfo: {
    lastName: string;
    name: string;
    middleName: string;
    dateOfBirth: Date;
    phoneNumber: string;
    gender?: Gender;
    clientGroup: ClientGroup[];
    coordinator: ILabelValue<number>;
    doNotSendSMS: boolean;
  };

  address: {
    index: string;
    country: ILabelValue<number>;
    area: string;
    city: ILabelValue<number>;
    street: string;
    house: string;
  };

  identity: {
    documentType: DocumentType;
    series: string;
    number: string;
    issuedBy: string;
    dateOfIssue: Date;
    file: File | string; // it's string if received from API (image URL)
  };
}
