import { HttpParams } from '@angular/common/http';

export function anyToHttpParams(obj: any): HttpParams {
  let param = new HttpParams();

  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      // Does not add array into query params if it's length is 0
      // Does not add array item into query params string if it's null or undefined
      if (obj[key] && Array.isArray(obj[key])) {
        const arrayNotNullValues = (obj[key] as Array<any>).filter(val => val !== null && val !== undefined);
        if (!arrayNotNullValues.length) {
          return param;
        }

        param = param.set(key, obj[key][0]);

        for (let i = 1; i < arrayNotNullValues.length; i++) {
          param = param.append(key, arrayNotNullValues[i]);
        }
      } else if (obj[key]) {
        param = param.set(key, obj[key] as string);
      }
    }
  }

  return param;
}
