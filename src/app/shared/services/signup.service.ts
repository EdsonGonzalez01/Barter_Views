import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Token } from '../interfaces/token';
import { HttpClient } from '@angular/common/http';
import { User } from '../interfaces/user';
import { LoginService } from './login.service';

@Injectable({
  providedIn: 'root'
})
export class SignupService {

  constructor(private httpClient: HttpClient, private loginService: LoginService) { }

  signUp(creds: User): Observable<User>{
    const create_url: string = `${environment.apiUrl}user`;
    const response = this.httpClient.post<User>(create_url, {
      name: creds.name,
      lastname: creds.lastName,
      email: creds.email,
      password: creds.password,
      location: creds.location,
      roles: creds.roles
    }
    );
    //console.log(response)
    return response
  }
}
