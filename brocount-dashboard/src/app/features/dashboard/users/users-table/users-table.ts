import { Component, input, output } from '@angular/core';
import { UserRow } from './user-row/user-row';
import { IUser } from '../../../../models/user.interface';

@Component({
  imports: [UserRow],
  selector: 'bc-users-table',
  templateUrl: './users-table.html',
})
export class UsersTable {
  public users = input.required<IUser[]>();

  public onEditUser = output<IUser>();
  public onDeleteUser = output<IUser>();
}
