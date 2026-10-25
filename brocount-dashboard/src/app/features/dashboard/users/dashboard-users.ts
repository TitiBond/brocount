import { Component, inject, OnInit } from '@angular/core';
import { UserService } from '../../../services/user.service';

@Component({
  imports: [],
  selector: 'bc-dashboard-users',
  templateUrl: './dashboard-users.html',
})
export class DashboardUsers implements OnInit {
  private readonly _userService = inject(UserService);

  protected readonly userList = this._userService.users;

  ngOnInit(): void {
    this._userService.loadUsers();
  }
}
