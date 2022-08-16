import { ILabelValue } from '../../../common/models/label-value.model';

export enum ClientGroup {
  VIP = 'VIP',
  Loyal = 'Loyal',
  New = 'New',
}

export function getClientGroupDisplayValues(): Array<ILabelValue<ClientGroup>> {
  return [
    {
      label: 'VIP Clients',
      value: ClientGroup.VIP,
    },
    {
      label: 'Loyal Clients',
      value: ClientGroup.Loyal,
    },
    {
      label: 'New Clients',
      value: ClientGroup.New,
    },
  ];
}
