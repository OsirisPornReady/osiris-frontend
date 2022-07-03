import { Injectable } from '@angular/core';
import { User } from '../../models/user';
import {observable, Observable, of} from "rxjs";

@Injectable({
  providedIn: 'root'
})


export class UserService {

  userlist: User[] = [
    {
      username:"ash",
      pwd:"123"
    },
    {
      username:"jeff",
      pwd:"456"
    },
    {
      username:"kaplan",
      pwd:"789"
    }
  ]

  constructor() { }

  validateUser(username:string,pwd:string): number {
    for(let key in this.userlist) {
      if(this.userlist[key].username == username && this.userlist[key].pwd == pwd){
        return Number(key);
      }
    }
    return -1;
  }

  getUserInfo(userId:number): any {
    console.log(userId)
    return this.userlist[userId];
  }


}
