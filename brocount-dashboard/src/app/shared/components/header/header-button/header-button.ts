import { Component, input } from '@angular/core';
import { IHeaderButtonOption } from '../model/header-button.interface';
import { TitleCasePipe } from '@angular/common';

@Component({
  imports: [TitleCasePipe],
  selector: 'bc-header-button',
  styleUrl: './header-button.css',
  templateUrl: './header-button.html',
})
export class HeaderButton {
  public headerButtonOption = input.required<IHeaderButtonOption>();
}
