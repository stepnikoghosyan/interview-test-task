import { DisplayValues } from '../display-values.model';

export enum Gender {
  Male = 'Male',
  Female = 'Female',
  Other = 'Other',
}

export function getGenderDisplayValues(): DisplayValues<Gender> {
  return {
    mapping: {
      [Gender.Male]: 'Male',
      [Gender.Female]: 'Female',
      [Gender.Other]: 'Other',
    },
    values: [
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
    ]
  };
}
