
import { computed, inject, Injectable } from '@angular/core';

import { UserApi } from '../data/apis/user.api';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private readonly _userApi = inject(UserApi);

  readonly users = computed(() =>
    this._userApi.usersResource.value(),
  );

  protected readonly loading = this._userApi.usersResource.isLoading;
  protected readonly error = this._userApi.usersResource.error;

  public loadUsers(): void {
    this._userApi.loadUsers();
  }

  protected reloadUsers(): void {
    this._userApi.usersResource.reload();
  }
}
