import { Observable } from 'rxjs';

export function getBase64FromFile(file: File): Observable<string> {
  return new Observable((subscriber) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = () => {
      subscriber.next(reader.result as string);
      subscriber.complete();
    };

    reader.onerror = () => {
      subscriber.next(undefined);
      subscriber.complete();
    };
  });
}
