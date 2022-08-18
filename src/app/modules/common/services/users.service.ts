import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

// services
import { BaseHttpService } from './base-http.service';

// models
import { IUserData } from '../../client-form/models/user-data.model';

@Injectable({ providedIn: 'root' })
export class UsersService extends BaseHttpService<IUserData> {
  private readonly URL = 'users';

  constructor(
    httpClient: HttpClient,
  ) {
    super(httpClient);
  }

  public getUserById(id: number): Observable<IUserData> {
    return this.getById(this.URL, id);
  }

  public getUsers(): Observable<IUserData[]> {
    return this.getList<IUserData>(this.URL);
  }

  public createUser(data: Omit<IUserData, 'id'>): Observable<IUserData> {
    return this.post<Omit<IUserData, 'id'>, IUserData>(this.URL, data);
  }

  public updateUser(id: number, data: Partial<IUserData>): Observable<IUserData> {
    return this.put(this.URL, id, data);
  }

  public deleteUser(id: number): Observable<void> {
    return this.deleteById(this.URL, id);
  }
}
