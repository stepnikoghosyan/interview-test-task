import { ILabelValue } from '../../common/models/label-value.model';

interface IResponse {
  data: string[];
}

export function normalizeCityResponse(response: IResponse): Array<ILabelValue<string>> {
  return (response && response.data || []).map(
    (item) => ({
      label: item,
      value: item,
    }),
  );
}
