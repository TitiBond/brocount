export interface IButtonOption {
  label: string;
  icon: string;
  color: 'primary' | 'danger';
  isIcon?: boolean;
  action: () => void;
}
