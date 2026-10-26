export interface IInfoCardOption {
  title: string;
  value: string;
  subtile: string;
  icon: IInfoCardIconOption;
}

export interface IInfoCardIconOption {
  name: string;
  color: 'gray' | 'green';
}
