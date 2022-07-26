export interface User {
  username:string;
  password:string;
  authority:{
    create:boolean;
    retrieve:boolean;
    update:boolean;
    delete:boolean;
  };
  messageCount:number;
}
