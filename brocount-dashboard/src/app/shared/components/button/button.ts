import { Component, input } from '@angular/core';
import { IButtonOption } from './models/button-option.interface';

@Component({
  imports: [],
  selector: 'bc-button',
  templateUrl: './button.html',
})
export class Button {
  public buttonOption = input.required<IButtonOption>();
}
