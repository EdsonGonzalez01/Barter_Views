import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../interfaces/user';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { TokenService } from './token.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private httpClient: HttpClient, private tokenService: TokenService) {}

  getUser(): Observable<User> {
    const authToken = this.tokenService.get();
    const headers = new HttpHeaders().set('Authorization', `${authToken}`);
    return this.httpClient.get<User>(environment.apiUrl+'user/data', { headers });
  }

  updateUser(userData: {}){
    const authToken = this.tokenService.get();
    const headers = new HttpHeaders().set('Authorization', `${authToken}`);
    return this.httpClient.put<User>(environment.apiUrl+'user/update', userData, { headers });
  }
}
