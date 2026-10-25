import { UserRoleEnum } from "./user.role.enum";

export interface IUser{
    id: number,
    email: string,
    role: UserRoleEnum
}