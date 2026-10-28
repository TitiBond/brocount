import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { UserService } from '../../../services/user.service';
import { IInfoCardOption } from '../../../shared/components/info-card/models/info-card-option.interface';
import { InfoCard } from '../../../shared/components/info-card/info-card';
import { UsersTable } from './users-table/users-table';
import { IUser } from '../../../models/user.interface';
import { UserRoleEnum } from '../../../models/user.role.enum';
import { Input } from '../../../shared/components/input/input';
import { IInputOption } from '../../../shared/components/input/models/input-option.interface';
import { Button } from '../../../shared/components/button/button';
import { IButtonOption } from '../../../shared/components/button/models/button-option.interface';

type UserRoleFilter = UserRoleEnum | '';

@Component({
  imports: [InfoCard, UsersTable, Input, Button],
  selector: 'bc-dashboard-users',
  templateUrl: './dashboard-users.html',
})
export class DashboardUsers implements OnInit {
  private readonly _userService = inject(UserService);

  protected readonly userList = this._userService.users;
  protected readonly usersStats = this._userService.usersStats;
  protected readonly selectedRole = signal<UserRoleFilter>('');
  private readonly _inputValue = signal<string>('');

  ngOnInit(): void {
    this._userService.loadUsers();
  }

  protected readonly filteredUsers = computed(() => {
    const users = (this.userList() ?? [])
      .sort((a, b) => a.id - b.id)
      .filter(
        (u) => u.email.includes(this._inputValue()) || u.id.toString().includes(this._inputValue()),
      );
    const role = this.selectedRole();

    if (!role) {
      return users;
    }

    return users.filter((user) => user.role === role);
  });

  protected refreshButtonOption: IButtonOption = {
    label: 'Actualiser',
    icon: 'refresh',
    color: 'primary',
    action: () => {
      this._userService.reloadUsers();
    },
  };

  protected inputOption: IInputOption = {
    placeholder: 'Rechercher un email...',
    icon: 'search',
  };

  protected readonly cards = computed<IInfoCardOption[]>(() => {
    const stats = this.usersStats();

    return [
      {
        title: 'Total utilisateurs',
        value: `${stats?.totalUsers ?? 0}`,
        subtile: 'Comptes enregistrés',
        icon: { name: 'group', color: 'gray' },
      },
      {
        title: 'Administrateurs',
        value: `${stats?.totalAdmins ?? 0}`,
        subtile: 'Accès privilégiés',
        icon: { name: 'shield', color: 'green' },
      },
      {
        title: 'Actifs récemment',
        value: `${stats?.activeUsersLast30Days ?? 0}`,
        subtile: 'Sur les 30 derniers jours',
        icon: { name: 'trending_up', color: 'green' },
      },
      {
        title: 'Modérateurs',
        value: `${stats?.totalModerators ?? 0}`,
        subtile: 'Équipe de modération',
        icon: { name: 'verified_user', color: 'gray' },
      },
    ];
  });

  public onEditUser(user: IUser): void {
    console.log('user a edit : ', user);
  }

  public onDeleteUser(user: IUser): void {
    console.log('user a delete : ', user);
  }

  protected onSelectRole(event: Event): void {
    const select = event.target as HTMLSelectElement;
    this.selectedRole.set(select.value as UserRoleFilter);
  }

  protected onInputChange(value: string): void {
    this._inputValue.set(value);
  }
}
