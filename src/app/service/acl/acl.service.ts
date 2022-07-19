import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AclService {

  constructor() { }

  buttonRoleValidate(aclIf: string): boolean {
    if (aclIf == 'admin') {
      return true;
    } else {
      return false;
    }
  }



}
