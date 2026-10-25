import { Component, input } from '@angular/core';
import { IHeaderOption } from './model/header.interface';
import { HeaderButton } from './header-button/header-button';
import { TitleCasePipe } from '@angular/common';

@Component({
  imports: [HeaderButton, TitleCasePipe],
  selector: 'bc-header',
  styleUrl: './header.css',
  templateUrl: './header.html',
})
export class Header {
  public headerOptions = input.required<IHeaderOption>();
}
