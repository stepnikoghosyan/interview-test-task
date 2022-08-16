import { ILabelValue } from '../../common/models/label-value.model';
import { ProfileTabs } from '../models/enums/profile-tabs.model';

export function getProfileTabsConfig(): ILabelValue<ProfileTabs>[] {
  return [
    {
      label: 'Basic Info',
      value: ProfileTabs.BasicInfo,
    },
    {
      label: 'Address',
      value: ProfileTabs.Address,
    },
    {
      label: 'Identity',
      value: ProfileTabs.Identity,
    },
  ];
}
