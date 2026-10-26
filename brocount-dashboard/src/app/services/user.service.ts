import { computed, inject, Injectable } from '@angular/core';

import { UserApi } from '../data/apis/user.api';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private readonly _userApi = inject(UserApi);

  // Données
  readonly users = computed(() => this._userApi.usersResource.value());
  readonly usersStats = computed(() => this._userApi.usersStatsResource.value());

  // Chargement
  readonly usersLoading = this._userApi.usersResource.isLoading;
  readonly usersStatsLoading = this._userApi.usersStatsResource.isLoading;

  // Erreurs
  readonly usersError = this._userApi.usersResource.error;
  readonly usersStatsError = this._userApi.usersStatsResource.error;

  public loadUsers(): void {
    this._userApi.loadUsers();
  }

  public reloadUsers(): void {
    this._userApi.usersResource.reload();
    this._userApi.usersStatsResource.reload();
  }
}
