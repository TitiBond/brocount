import { Component, input } from '@angular/core';
import { IBadgeOption } from './models/badge.interface';
import { UpperCasePipe } from '@angular/common';

@Component({
  imports: [UpperCasePipe],
  selector: 'bc-badge',
  templateUrl: './badge.html',
})
export class Badge {
  public badgeOption = input.required<IBadgeOption>();
}
