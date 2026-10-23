import { Component, input } from '@angular/core';
import { IMenuButtonOption } from '../model/side-menu-button.interface';

@Component({
  imports: [],
  selector: 'bc-side-menu-button',
  templateUrl: './side-menu-button.html',
})
export class SideMenuButton {
  public buttonOption = input.required<IMenuButtonOption>();
}
