// type Authority = {
//   create:boolean;
//   retrieve:boolean;
//   update:boolean;
//   delete:boolean;
// }

// interface Authority {
//   create:boolean;
//   retrieve:boolean;
//   update:boolean;
//   delete:boolean;
// }

export class User { //interface
  username:string;
  password:string;
  authority:{
    create:boolean;
    retrieve:boolean;
    update:boolean;
    delete:boolean;
  };
  messageCount:number;

  constructor(
    username:string = '',
    password:string = '',
    authority = {
      create:false,
      retrieve:false,
      update:false,
      delete:false
    },
    messageCount:number = -1
  ) {
    this.username = username;
    this.password = password;
    this.authority = authority;
    this.messageCount = messageCount;
  }

  static toUser(obj:any): User {
    let user = new User();
    for (let prop in obj) {
      // @ts-ignore
      user[prop as keyof User] = JSON.parse(JSON.stringify(obj[prop])); //傻逼安全检查，忽略就完事，类型检查不但没让人方便反而更烦人了
    }
    return user;
  }
}

