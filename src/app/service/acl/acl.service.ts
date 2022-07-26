import { Injectable } from '@angular/core';
import { UserService } from "../user/user.service";
import {User} from "../../models/user";

@Injectable({
  providedIn: 'root'
})
export class AclService {

  currentUser!:User | null;

  constructor(
    private userService: UserService,
  ) { }

  buttonRoleValidate(aclIf: string): boolean {
    this.currentUser = this.userService.getCurrentUser()
    if (this.currentUser?.authority[aclIf as keyof Object]) {
      return true;
    } else {
      return false;
    }
  }


}
