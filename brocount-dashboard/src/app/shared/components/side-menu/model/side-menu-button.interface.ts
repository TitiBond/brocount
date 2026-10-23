import { Signal } from '@angular/core';

export interface IMenuButtonOption {
  title: string;
  icon: string;
  isActive: Signal<boolean>;
  action: () => void;
}
