import { ILabelValue } from './label-value.model';

export type DisplayValues<T extends string | number | symbol> = {
  mapping: { [key in T]: string };
  values: ILabelValue<T>[];
};
