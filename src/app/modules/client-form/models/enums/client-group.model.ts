import { DisplayValues } from '../../../common/models/display-values.model';

export enum ClientGroup {
  VIP = 'VIP',
  Loyal = 'Loyal',
  New = 'New',
}

export function getClientGroupDisplayValues(): DisplayValues<ClientGroup> {
  return {
    mapping: {
      [ClientGroup.VIP]: 'VIP Clients',
      [ClientGroup.Loyal]: 'Loyal Clients',
      [ClientGroup.New]: 'New Clients',
    },
    values: [
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
    ],
  };
}
