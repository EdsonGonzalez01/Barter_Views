import { Injectable } from '@angular/core';

import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  loginStatus: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor() { 
    this.loginStatus.next(this.isLoggedIn());
  }

  save(token:string){
    localStorage.setItem('token', token);
    this.loginStatus.next(true);
  }

  get(): string{
    return localStorage.getItem('token') || '';
  }

  isLoggedIn(): boolean{
    return this.get() ? true : false;
  }

  remove(){
    localStorage.removeItem('token');
    this.loginStatus.next(false);
  }
}
