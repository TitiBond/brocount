import { UserRoleEnum } from './user.role.enum';

export interface IUser {
  id: number;
  email: string;
  createdAt: Date;
  lastLoginAt: Date | null;
  role: UserRoleEnum;
}
