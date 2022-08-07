import { Injectable } from '@angular/core';
import { WebsocketService } from "../websocket/websocket.service";
import {WebSocketSubject} from "rxjs/webSocket";
import { Subject } from "rxjs";


@Injectable({
  providedIn: 'root'
})
export class MessagePushService {

  messageSocket$!: WebSocketSubject<any> | null;
  message$: Subject<any> = new Subject<any>();

  constructor(
    private websocketService: WebsocketService,
  ) { }

  initService() {
    this.messageSocket$ = this.websocketService.connectSocket('loginMessage')
    if (this.messageSocket$) {
      this.messageSocket$.subscribe(
        (next:any) => {
          this.message$.next(next);
        },
        error => {},
        () => {}
      )
    }
  }

  sendMessage(data:any) {
    this.messageSocket$?.next(data);
  }

}
