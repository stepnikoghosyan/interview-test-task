import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { delay, map } from 'rxjs/operators';

// environment
import { environment } from 'src/environments/environment';

// helpers
import { anyToHttpParams } from '../utils/any-to-http.params';

export abstract class BaseHttpService<T = any> {

  protected readonly BASE_API_ENDPOINT: string = environment.BASE_API_ENDPOINT;

  protected constructor(
    protected readonly http: HttpClient,
  ) {
  }

  protected getById<T>(url: string, id: number): Observable<T | undefined> {
    // return this.http.get<T>(`${ this.BASE_API_ENDPOINT }/${ url }/${ id }/`, {
    //   headers,
    // });

    return of()
      .pipe(
        delay(1500),
        map(() => {
          const result = this.getData<T>(url).find(item => (item as any).id === id);

          if (!result) {
            throw new Error('Not Found');
          }

          return result;
        }),
      );
  }

  protected getList<T>(url: string): Observable<T[]> {
    // return this.http.get<IPaginationResponse<T>>(`${ this.BASE_API_ENDPOINT }/${ url }/`, {
    //   params: anyToHttpParams(params),
    // });

    return of()
      .pipe(
        delay(1500),
        map(() => {
          return this.getData<T>(url) || [];
        }),
      );
  }

  protected post<PayloadType, ResponseType>(url: string, body: PayloadType | T): Observable<ResponseType> {
    // return this.http.post<ResponseType>(`${ this.BASE_API_ENDPOINT }/${ url }/`, body);

    return of()
      .pipe(
        delay(1500),
        map(() => {
          const result = this.create<ResponseType>(url, body);
          if (!result) {
            throw new Error('Failed');
          }

          return result;
        }),
      );
  }

  protected put<PayloadType, ResponseType = T>(url: string, id: number, body: PayloadType | T): Observable<ResponseType> {
    // return this.http.put<ResponseType>(`${ this.BASE_API_ENDPOINT }/${ url }/`, body);

    return of()
      .pipe(
        delay(1500),
        map(() => {
          const result = this.update<ResponseType>(url, id, body);

          if (!result) {
            throw new Error('Update Failed');
          }

          return result;
        }),
      );
  }

  protected deleteById<T = void>(url: string, id: number): Observable<void> {
    // return this.http.delete<T>(`${ this.BASE_API_ENDPOINT }/${ url }/${ id }/`);

    return of()
      .pipe(
        delay(1500),
        map(() => {
          const result = this.delete<T>(url, id);

          if (!result) {
            throw new Error('Not Found');
          }
        }),
      );
  }

  protected downloadFile(url: string, fileName: string, actionType: 'download' | 'openInNewTab' = 'download'): Observable<void> {
    return this.http.get(`${ this.BASE_API_ENDPOINT }/${ url }/`, {
      responseType: 'blob',
      params: anyToHttpParams(queryParams),
    })
      .pipe(map(response => {
        const file = new Blob([response], { type: response.type });

        const uniqueID = `download-link-unique-id-${ Date.now().toString(36) }`;
        const downloadLink = document.createElement('a');
        downloadLink.id = uniqueID;
        downloadLink.href = window.URL.createObjectURL(file);

        if (actionType === 'download') {
          downloadLink.setAttribute('download', fileName);
        } else {
          downloadLink.setAttribute('target', '_blank');
        }

        document.body.appendChild(downloadLink);
        downloadLink.click();

        window.URL.revokeObjectURL(downloadLink.href);
        const element = document.getElementById(uniqueID);
        if (!!element) {
          element.remove();
        }
      }));
  }


  // MOCK API
  private getData<T>(key: string): T[] {
    return this.getItem<T[]>(key) || [];
  }

  private create<ResponseType>(key: string, payload: any): ResponseType | undefined {
    const data = this.getData<ResponseType>(key);
    if (!data) {
      throw new Error('Failure');
    }

    const newItem: ResponseType = {
      id: (data[data.length - 1] as any).id + 1,
      ...payload,
    };

    data.push(newItem);

    this.setItem(key, data);

    return newItem;
  }

  private update<ResponseType>(key: string, id: number, payload: any): ResponseType | undefined {
    const data = this.getData<ResponseType>(key);
    if (!data) {
      return;
    }

    const index = data.findIndex(item => (item as any).id === id);
    if (index === -1) {
      return;
    }

    data[index] = {
      ...data[index],
      ...payload,
    };

    this.setItem(key, data);

    return data[index];
  }

  private delete(key: string, id: number): boolean {
    const data = this.getData<any>(key);
    if (!data) {
      return false;
    }

    const index = data.findIndex(item => item.id === id);
    if (index === -1) {
      return false;
    }

    data.splice(index, 1);

    this.setItem(key, data);

    return true;
  }

  private setItem(key: string, value: any): void {
    localStorage.setItem(key, JSON.stringify(value));
  }

  private getItem<T>(key: string): T | undefined {
    try {
      const value = localStorage.getItem(key);
      if (!value) {
        return;
      }

      return JSON.parse(value);
    } catch (e) {
      return;
    }
  }
}
