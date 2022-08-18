import { Steps } from './steps.model';
import { IControlBase } from './controls/control-base.model';

export interface IStepConfigItem {
  route: Steps;
  pageTitle: string;
  controls: Array<IControlBase<any>>;

  // key: keyof T;
  // // formValueToPayload: <K extends keyof T>(value: any) => T[K];
  //
  // hopar: {
  //   [K in keyof T]?: (value: any) => T[K];
  // } & { key: keyof T };
}
