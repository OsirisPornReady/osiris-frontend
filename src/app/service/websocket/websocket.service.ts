import { Injectable } from '@angular/core';
import { webSocket, WebSocketSubject } from "rxjs/webSocket";
import { Subject } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class WebsocketService {

  constructor() { }


  //原生的socket方法，如果有推送要求最好加上asObservable
  // private wsUrl:string = 'ws://localhost:3000/socketTest';
  // private socket$:any;
  //
  // initSocket() {
  //   this.socket$ = new WebSocket(this.wsUrl);
  //   const message$ = this.socket$.asObservable();
  //   this.socket$.onopen = function () {
  //     console.log('开启socket')
  //   }
  //   this.socket$.onmessage = function () {
  //     console.log('发信了')
  //   }
  // }
  //
  // sendSocket() {
  //   this.socket$.send('message')
  // }


  //angular风格的socket
  private baseUrl: string = 'ws://localhost:3000/websocket/'; //ws://localhost:3000/socketTest
  // private socket$: WebSocketSubject<any> | null = null; //最好不这样写，做成通用socket接口，因为可能不止需要一个socket

  connectSocket(socketUrl: string) {
    const wsUrl = this.baseUrl + socketUrl;
    let socket$: WebSocketSubject<any> | null = webSocket({
      url: wsUrl,
      openObserver: { //连接成功
        next: () => {
          console.log(`[WebSocket Service]: "${wsUrl}" connection opened`);
        },
        error: (e) => {
          console.log(e)
        }
      },
      closeObserver: { //连接失败
        next: () => {
          console.log(`[WebSocket Service]: "${wsUrl}" connection closed`);
          socket$ = null;
        },
        error: (e) => {
          console.log(e)
        }
      }
    })

    return socket$;
  }


  disconnectSocket(socket$: any) {
    if (socket$) {
      socket$.complete();
      console.log(`[WebSocket Service]: socket connection closed`);
    } else {
      console.log('[WebSocket Service]: socket connection already closed')
    }
  }


  //得到连接成功的socket$之后:
  // socket$.next(data)  发送数据
  // socket$.subscribe(  接收数据
  //   (next:any) => { 经过库处理包装后传回的json数据会被自动解析为object，传送过去的object也会被自动转成json
  //     this.receiveSocketData(next)
  //   },
  //   (error:any) => {
  //     console.log('[WebSocket Service]: connection closed')
  //   },
  //   () => {}
  // )



  // if (this.socket$) { //这个其实可以放到另一个service里面
  //   this.socket$.subscribe(
  //     (next:any) => {
  //       this.receiveSocketData(next)
  //     },
  //     (error:any) => {
  //       console.log('[WebSocket Service]: connection closed')
  //     },
  //     () => {}
  //   )
  // }

  // getSocket(socketUrl: string) {
  //   if (this.socket$ == null || this.socket$.closed) {
  //     this.connectSocket(socketUrl)
  //   }
  //   return this.socket$
  // }

  // sendSocketData(data:any) {
  //   if (this.socket$) {
  //     this.socket$.next(data);
  //   } else {
  //     console.log('[WebSocket Service]: socket connection already closed')
  //   }
  // }
  //
  // receiveSocketData(data:any) { //对socket传回的原始数据做处理后再进行分发
  //   /*
  //     处理...
  //   */
  //   this.message$.next(data)
  // }

}
