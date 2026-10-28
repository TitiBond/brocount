import { DatePipe } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'customDate',
})
export class CustomDatePipe implements PipeTransform {
  private readonly _datePipe = new DatePipe('fr-FR');

  transform(value: Date | null): string {
    if (value === null) return 'Jamais';
    const date = new Date(value);
    const now = new Date();

    const isToday = date.toDateString() === now.toDateString();

    const yesterday = new Date(now);
    yesterday.setDate(now.getDate() - 1);

    const isYesterday = date.toDateString() === yesterday.toDateString();

    const time = this._datePipe.transform(date, 'HH:mm') ?? '';

    if (isToday) {
      return `Aujourd'hui, ${time}`;
    }

    if (isYesterday) {
      return `Hier, ${time}`;
    }

    return this._datePipe.transform(date, 'dd/MM/yy, HH:mm') ?? '';
  }
}
