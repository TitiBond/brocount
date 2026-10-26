import { Component, computed, inject, OnInit } from '@angular/core';
import { UserService } from '../../../services/user.service';
import { IInfoCardOption } from '../../../shared/components/info-card/models/info-card-option.interface';
import { InfoCard } from '../../../shared/components/info-card/info-card';
import { DatePipe } from '@angular/common';

@Component({
  imports: [InfoCard, DatePipe],
  selector: 'bc-dashboard-users',
  templateUrl: './dashboard-users.html',
})
export class DashboardUsers implements OnInit {
  private readonly _userService = inject(UserService);

  protected readonly userList = this._userService.users;
  protected readonly usersStats = this._userService.usersStats;

  ngOnInit(): void {
    this._userService.loadUsers();
  }

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
}
