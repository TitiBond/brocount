import { UpperCasePipe } from '@angular/common';
import { Component, computed, input } from '@angular/core';

@Component({
  imports: [UpperCasePipe],
  selector: 'bc-user-badge',
  templateUrl: './user-badge.html',
})
export class UserBadge {
  public email = input.required<string>();

  protected label = computed(() =>
    this.email()
      .split('@')[0]
      .split(/[._-]/)
      .map((x) => x[0])
      .join('')
      .slice(0, 2)
      .toUpperCase(),
  );
}
