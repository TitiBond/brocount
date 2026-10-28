import { Component, input, output } from '@angular/core';
import { IInputOption } from './models/input-option.interface';

@Component({
  imports: [],
  selector: 'bc-input',
  templateUrl: './input.html',
})
export class Input {
  public inputOption = input.required<IInputOption>();
  public onChange = output<string>();

  protected onChangeEvent(event: InputEvent): void {
    const input = event.target as HTMLInputElement;
    this.onChange.emit(input.value);
  }
}
