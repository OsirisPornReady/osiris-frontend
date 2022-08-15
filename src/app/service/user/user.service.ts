import { Injectable } from '@angular/core';
import { User } from '../../models/user';
import {observable, Observable, of} from "rxjs";
import { catchError,retry } from "rxjs/operators";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { CommonDataService } from "../common-data/common-data.service";

@Injectable({
  providedIn: 'root'
})


export class UserService {

  httpOptions = {
    headers: new HttpHeaders({'Content-Type':'application/json'})
  };
  // userlist: User[] = [
  //   {
  //     username:"admin",
  //     password:"123456",
  //     authority:{
  //       create:true,
  //       retrieve:true,
  //       update:true,
  //       delete:true,
  //     },
  //     messageCount: 10,
  //   },
  //   {
  //     username:"ash",
  //     password:"123",
  //     authority:{
  //       create:true,
  //       retrieve:true,
  //       update:true,
  //       delete:false,
  //     },
  //     messageCount: 25,
  //   },
  //   {
  //     username:"jeff",
  //     password:"456",
  //     authority:{
  //       create:false,
  //       retrieve:true,
  //       update:true,
  //       delete:false,
  //     },
  //     messageCount: 0,
  //   },
  //   {
  //     username:"kaplan",
  //     password:"789",
  //     authority:{
  //       create:false,
  //       retrieve:true,
  //       update:false,
  //       delete:false,
  //     },
  //     messageCount: 100000,
  //   }
  // ]

  userlist: User[] = []

  currentUser:User | null = null;

  // _currentUser:any = null;
  // set currentUser(currentUser:any) {
  //   localStorage.setItem('currentUser',JSON.stringify(currentUser));
  //   this._currentUser = currentUser
  // }
  //
  // get currentUser() {
  //   const currentUserStr = localStorage.getItem('currentUser')
  //   if (currentUserStr) {
  //     this._currentUser = JSON.parse(currentUserStr);
  //   }
  //   return this._currentUser;
  // }

  constructor(
    private http: HttpClient,
    private commonDataService: CommonDataService,
  ) { }

  // validateUser(userdata:any): number {
  //   try {
  //     const username:string = userdata.username;
  //     const password:string = userdata.password;
  //
  //     for (let [index,user] of this.userlist.entries()) {
  //       if(user.username == username){
  //         if (user.password == password) {
  //           this.currentUser = user //直接取引用了，要改可以直接改
  //           return index;
  //         } else {
  //           return -1; //密码错误
  //         }
  //       }
  //     }
  //     return -2; //没找到符合的user
  //   } catch (e) {
  //     console.error(e)
  //     return -3; //输入的userdata发生了错误
  //   }
  // }

  getUserByIndex(index:number): any {
    return this.userlist[index];
  }

  getCurrentUser(): User | null {
    return this.currentUser;
  }

  setCurrentUser(user:any): void {
    if (user) {
      this.currentUser = User.toUser(user);
    } else {
      this.currentUser = null;
    }
  }

  getLastUser() {
    return this.http.get('/ajax/user/getLastUser').toPromise()
  }

  setLastUser() {
    const data = JSON.stringify(this.currentUser);
    return this.http.post('/ajax/user/setLastUser',data,this.httpOptions).toPromise();
  }

  async signIn(userdata:any) {
    // this.http.get('/ajax/login').subscribe(data => { //proxy会将请求以http:xxx.xx.xxx:xxxx/url的形式转发
    //   console.log(data);
    // })

    //不是很需要特别复杂的headers，因为有node进行请求中转，只需要发送数据就可以了
    // const httpOptions = {
    //   headers: new HttpHeaders({'Content-Type':'application/json'})
    // };

    const data = JSON.stringify(userdata);

    // return this.http.post('/ajax/login/post',userdata,httpOptions) //可以return之后在component之中.subscribe()返回值，也可以直接toPromise，这里数据简单就直接toPromise了
    let res:any = await this.http.post('/ajax/user/login',data,this.httpOptions).toPromise();
    if (res) {
      this.setCurrentUser(res.user);
      return res.state;
    } else {
      return -3;
    }

    // return this.validateUser(userdata);
  }

  signOut() {
    // localStorage.setItem('lastUser',JSON.stringify(this.currentUser));
    // this.currentUser = null;
    return this.setLastUser();
  }

}
