import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CommonDataService {

  isQuickDelete:boolean = false;

  constructor() { }
}
