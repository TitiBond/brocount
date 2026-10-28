import { Component, computed, input, output } from '@angular/core';
import { Badge } from '../../../../../shared/components/badge/badge';
import { IUser } from '../../../../../models/user.interface';
import { CustomDatePipe } from '../../../../../shared/pipes/custom-date.pipe';
import { IBadgeOption } from '../../../../../shared/components/badge/models/badge.interface';
import { Button } from '../../../../../shared/components/button/button';
import { IButtonOption } from '../../../../../shared/components/button/models/button-option.interface';

@Component({
  imports: [Badge, CustomDatePipe, Button],
  selector: 'tr[bc-user-row]',
  templateUrl: './user-row.html',
})
export class UserRow {
  public user = input.required<IUser>();

  public edit = output<IUser>();
  public delete = output<IUser>();

  protected readonly badgeOption = computed<IBadgeOption>(() => {
    const role = this.user().role;

    switch (role) {
      case 'ADMIN':
        return { label: role, color: 'green' };

      case 'MODERATOR':
        return { label: role, color: 'blue' };

      default:
        return { label: role, color: 'gray' };
    }
  });

  protected readonly editButtonOption: IButtonOption = {
    label: 'Modifier',
    icon: 'edit',
    color: 'primary',
    action: () => {
      this.edit.emit(this.user());
    },
  };

  protected readonly deletetButtonOption: IButtonOption = {
    label: 'Supprimer',
    icon: 'delete',
    color: 'danger',
    isIcon: true,
    action: () => {
      this.delete.emit(this.user());
    },
  };
}
