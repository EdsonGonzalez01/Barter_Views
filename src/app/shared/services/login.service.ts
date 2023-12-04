import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Token } from '../interfaces/token';
import { TokenService } from './token.service';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  role: BehaviorSubject<string> = new BehaviorSubject<string>("");

  constructor(
    private httpClient: HttpClient,
    private tokenService: TokenService
  ) { 
    this.role.next(this.getRole());
  }

  login(creds: {}): Observable<Token>{
    const url: string = environment.apiUrl + 'login';
    return this.httpClient.post<Token>(url, creds)
  }

  googleLogin(idToken: string): Observable<Token>{
    const url: string = environment.apiUrl + 'login/google';
    return this.httpClient.post<Token>(url, {idToken})
  }

  getAdmin(token:string) {
    const headers = new HttpHeaders().set('Authorization', `${token}`);
    const response = this.httpClient.get<any>(environment.apiUrl + 'login/admin', { headers });
    //console.log(response);
    return response;
  }

  getRole(){
    return localStorage.getItem('role') || '';
  }

  saveRole(role: string){
    localStorage.setItem('role', role);
    this.role.next("admin")
  }

  removeRole(){
    localStorage.removeItem('role');
    this.role.next("")
  }

}
