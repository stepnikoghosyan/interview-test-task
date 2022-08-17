import { Injectable } from '@angular/core';
import { IRequestData } from '../models/controls/select-control.model';
import { ILabelValue } from '../../common/models/label-value.model';
import { HttpClient } from '@angular/common/http';
import { anyToHttpParams } from '../../common/utils/any-to-http.params';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
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
