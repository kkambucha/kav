import { Injectable } from '@angular/core';
import { USERS } from '../../mocks/users';
import { IUser } from '../../interfaces/user';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/fromPromise';

@Injectable()
export class UserService {
  getUsers(): Observable<IUser[]> {
    return Observable.fromPromise(Promise.resolve(USERS));
  }

  getUsersList(): Promise<IUser[]> {
    return Promise.resolve(USERS);
  }

  getUsersSlowly(): Promise<IUser[]> {
    return new Promise(resolve => {
      setTimeout(() => resolve(this.getUsersList()), 100);
    });
  }
}
