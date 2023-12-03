import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { LoginService } from './login.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  loginStatus: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor(private httpClient: HttpClient) { 
    this.loginStatus.next(this.isLoggedIn());
  }

  save(token:string){
    localStorage.setItem('token', token);
    this.getAdmin().subscribe({
      next: (response) =>{
        //console.log("Respuesta de admin ", response.status);
        this.saveRole("admin")
      },
      error: (err) => {
        console.log("An error ocurred", err);
      }
    })
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

  getRole(){
    return localStorage.getItem('role') || '';
  }

  saveRole(role: string){
    localStorage.setItem('role', role);
  }

  removeRole(){
    localStorage.removeItem('role');
  }


  getAdmin() {
    const authToken = this.get();
    const headers = new HttpHeaders().set('Authorization', `${authToken}`);
    const response = this.httpClient.get<any>(environment.apiUrl + 'login/admin', { headers });
    //console.log(response);
    return response;
  }

}
