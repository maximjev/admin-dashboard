import {UserRole} from "./user-role";

export class UserAuthentication {

  constructor(
    public username: string,
    public roles: UserRole[]) {

  }

  hasRole(requested: string): boolean {
    return this.roles.find(role => role.code == requested) != null;
  }
}
