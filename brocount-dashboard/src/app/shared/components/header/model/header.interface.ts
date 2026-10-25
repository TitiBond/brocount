import { IHeaderButtonOption } from './header-button.interface';

export interface IHeaderOption {
  title: string;
  breadcrumb: string[];
  userEmail: string;
  buttons: IHeaderButtonOption[];
}
