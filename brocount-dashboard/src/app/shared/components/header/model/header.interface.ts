import { IHeaderButtonOption } from './header-button.interface';

export interface IHeaderOption {
  title: string;
  subtitle: string;
  buttons: IHeaderButtonOption[];
}
