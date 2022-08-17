import { ILabelValue } from '../../common/models/label-value.model';

interface IResponse {
  results: Array<{
    name: {
      first: string;
      last: string;
    };
    login: {
      uuid: string;
    };
  }>;
}

export function normalizeCoordinatorResponse(response: IResponse): Array<ILabelValue<string>> {
  return (response && response.results || []).map(
    (item) => ({
      label: `${item.name.first} ${item.name.last}`,
      value: item.login.uuid,
    }),
  );
}
