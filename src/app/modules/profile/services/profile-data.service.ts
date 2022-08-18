import { Injectable } from '@angular/core';

// models
import { IUserData } from '../../client-form/models/user-data.model';

@Injectable({ providedIn: 'root' })
export class ProfileDataService {
  public userData: IUserData;
}
