import { ILabelValue } from '../../common/models/label-value.model';

interface IResponse {
  data: Array<{
    country: string;
  }>;
}

export function normalizeCountryResponse(response: IResponse): Array<ILabelValue<string>> {
  return (response && response.data || []).map(
    (item) => ({
      label: item.country,
      value: item.country,
    }),
  );
}
