import { ILabelValue } from '../label-value.model';

export enum Gender {
  Male = 'Male',
  Female = 'Female',
  Other = 'Other',
}

export function getGenderDisplayValues(): Array<ILabelValue<Gender>> {
  return [
    {
      label: 'Male',
      value: Gender.Male,
    },
    {
      label: 'Female',
      value: Gender.Female,
    },
    {
      label: 'Other',
      value: Gender.Other,
    }
  ];
}
