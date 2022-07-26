import { Injectable } from '@angular/core';
import { User } from '../../models/user';
import {observable, Observable, of} from "rxjs";

@Injectable({
  providedIn: 'root'
})


export class UserService {

  userlist: User[] = [
    {
      username:"admin",
      password:"123456",
      authority:{
        create:true,
        retrieve:true,
        update:true,
        delete:true,
      },
      messageCount: 10,
    },
    {
      username:"ash",
      password:"123",
      authority:{
        create:true,
        retrieve:true,
        update:true,
        delete:false,
      },
      messageCount: 25,
    },
    {
      username:"jeff",
      password:"456",
      authority:{
        create:false,
        retrieve:true,
        update:true,
        delete:false,
      },
      messageCount: 0,
    },
    {
      username:"kaplan",
      password:"789",
      authority:{
        create:false,
        retrieve:true,
        update:false,
        delete:false,
      },
      messageCount: 100000,
    }
  ]

  _currentUser:any = null;
  set currentUser(currentUser:any) {
    localStorage.setItem('currentUser',JSON.stringify(currentUser));
    console.log('user storaged');
    this._currentUser = currentUser
  }

  get currentUser() {
    const currentUserStr = localStorage.getItem('currentUser')
    if (currentUserStr) {
      this._currentUser = JSON.parse(currentUserStr);
    }
    return this._currentUser;
  }

  constructor() { }

  validateUser(userdata:any): number {
    try {
      const username:string = userdata.username;
      const password:string = userdata.password;

      for (let [index,user] of this.userlist.entries()) {
        if(user.username == username){
          if (user.password == password) {
            this.currentUser = user //直接取引用了，要改可以直接改
            return index;
          } else {
            return -1; //密码错误
          }
        }
      }
      return -2; //没找到符合的user
    } catch (e) {
      console.error(e)
      return -3; //输入的userdata发生了错误
    }
  }

  getUserByIndex(index:number): any {
    return this.userlist[index];
  }

  getCurrentUser(): User | null {
    return this.currentUser;
  }

  signIn(userdata:any) {
    return this.validateUser(userdata);
  }

  signOut() {
    localStorage.setItem('lastUser',JSON.stringify(this.currentUser));
    this.currentUser = null;
  }

}
