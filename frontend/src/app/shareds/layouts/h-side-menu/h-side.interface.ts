import { IAccount, IRoleAccount } from "../../services/account.service";

export interface IHomeSidebarComponent {
  AppURL: any;
  HomeURL: any;
  UserLogin: IAccount;
  Role: typeof IRoleAccount;
}