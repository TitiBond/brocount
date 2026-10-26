import { Component, inject, OnInit } from '@angular/core';
import { UserService } from '../../../services/user.service';
import { IInfoCardOption } from '../../../shared/components/info-card/models/info-card-option.interface';
import { InfoCard } from '../../../shared/components/info-card/info-card';

@Component({
  imports: [InfoCard],
  selector: 'bc-dashboard-users',
  templateUrl: './dashboard-users.html',
})
export class DashboardUsers implements OnInit {
  private readonly _userService = inject(UserService);

  protected readonly userList = this._userService.users;

  ngOnInit(): void {
    this._userService.loadUsers();
  }

  protected readonly cards: IInfoCardOption[] = [
    {
      title: 'Total utilisateurs',
      value: '1284',
      subtile: 'Compte enregistrés',
      icon: { name: 'group', color: 'gray' },
    },
    {
      title: 'Administrateurs',
      value: '8',
      subtile: 'Accès privilégiés',
      icon: { name: 'shield', color: 'green' },
    },
    {
      title: 'Actifs récemment',
      value: '946',
      subtile: 'Sur les 30 derniers jours',
      icon: { name: 'trending_up', color: 'green' },
    },
    {
      title: 'Modérateurs',
      value: '24',
      subtile: 'Équipe de modération',
      icon: { name: 'verified_user', color: 'gray' },
    },
  ];
}
