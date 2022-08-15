import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CommonDataService {

  debugMode:boolean = true;
  isQuickDelete:boolean = false;
  ws!: WebSocket;

  guardRedirects:any = {
    dashboard: '/login',
    dashboardLazyLoad: '/login',
  }

  constructor() { }
}
