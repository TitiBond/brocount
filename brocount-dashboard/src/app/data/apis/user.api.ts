
import { httpResource } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';

import { IUser } from '../../models/user.interface';

@Injectable({
  providedIn: 'root',
})
export class UserApi {
  private readonly _shouldLoadUsers = signal(false);

  private readonly _apiUrl = '/api/admin/users';

  readonly usersResource = httpResource<IUser[]>(() =>
    this._shouldLoadUsers() ? this._apiUrl : undefined,
  );

  loadUsers(): void {
    this._shouldLoadUsers.set(true);
  }
}
