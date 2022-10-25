import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class PostDataInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    let dataReq:any = null;
    if (request.method == "POST") {
      dataReq = request.clone({
        setHeaders: {
          'Content-Type':'application/json',
        }
      })
    } else {
      dataReq = request;
    }
    return next.handle(dataReq); //request
  }
}
