import { Component, input } from '@angular/core';
import { IInfoCardOption } from './models/info-card-option.interface';
import { TitleCasePipe } from '@angular/common';

@Component({
  imports: [TitleCasePipe],
  selector: 'bc-info-card',
  templateUrl: './info-card.html',
})
export class InfoCard {
  public infoCardOptions = input.required<IInfoCardOption>();
}
