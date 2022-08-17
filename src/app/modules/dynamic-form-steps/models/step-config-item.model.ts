import { Steps } from './steps.model';
import { IControlBase } from './controls/control-base.model';

export interface IStepConfigItem {
  route: Steps;
  pageTitle: string;
  controls: Array<IControlBase<any>>;
}
