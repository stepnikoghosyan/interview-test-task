import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

// models
import { IRequestData } from '../../../../dynamic-form-steps/models/controls/select-control.model';
import { ILabelValue } from '../../../models/label-value.model';

// helpers
import { anyToHttpParams } from '../../../utils/any-to-http.params';

@Injectable()
export class GetDataService {
  constructor(
    private httpClient: HttpClient,
  ) {
  }

  public getData<ListItemType, ResponseType, PostBodyType>(
    requestData: IRequestData<ListItemType, ResponseType, PostBodyType>
  ): Observable<ILabelValue<ListItemType>[]> {
    const normalizer = requestData.dataNormalizerFn;

    if (requestData.method === 'GET') {
      return this.httpClient.get<ResponseType>(
        requestData.endpoint,
        {
          params: anyToHttpParams(requestData.queryParams),
        },
      )
        .pipe(
          map((res) => normalizer(res)),
        );
    }

    return this.httpClient.post<ResponseType>(requestData.endpoint, requestData.postBody)
      .pipe(
        map(res => normalizer(res)),
      );
  }
}
