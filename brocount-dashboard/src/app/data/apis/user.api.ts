import { httpResource } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';

import { IUser } from '../../models/user.interface';
import { IUserStat } from '../../models/user-stat.interface';

@Injectable({
  providedIn: 'root',
})
export class UserApi {
  private readonly _shouldLoad = signal(false);

  private readonly _userApiUrl = '/api/admin/users';
  private readonly _userStatApiUrl = `${this._userApiUrl}/stats`;

  readonly usersResource = httpResource<IUser[]>(() =>
    this._shouldLoad() ? this._userApiUrl : undefined,
  );

  readonly usersStatsResource = httpResource<IUserStat>(() =>
    this._shouldLoad() ? this._userStatApiUrl : undefined,
  );

  loadUsers(): void {
    this._shouldLoad.set(true);
  }
}
