import { Component, input } from '@angular/core';
import { IMenuOption } from './model/side-menu.interface';
import { TitleCasePipe } from '@angular/common';
import { SideMenuButton } from './side-menu-button/side-menu-button';

@Component({
  imports: [TitleCasePipe, SideMenuButton],
  selector: 'bc-side-menu',
  templateUrl: './side-menu.html',
})
export class SideMenu {
  public menuOptions = input.required<IMenuOption>();
}
