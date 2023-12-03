import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../interfaces/user';
import { File } from '../interfaces/file';
import { environment } from 'src/environments/environment';
import { TokenService } from './token.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private httpClient: HttpClient, private tokenService: TokenService) {}

  getUser(): Observable<User> {
    const authToken = this.tokenService.get();
    const headers = new HttpHeaders().set('Authorization', `${authToken}`);
    return this.httpClient.get<User>(environment.apiUrl + 'user/data/roles', { headers });
  }

  getUserByID(id:string): Observable<User> {
    const authToken = this.tokenService.get();
    const headers = new HttpHeaders().set('Authorization', `${authToken}`);
    return this.httpClient.get<User>(environment.apiUrl + `user/data/${id}`, { headers });
  }

  updateUser(userData: {}){
    const authToken = this.tokenService.get();
    const headers = new HttpHeaders().set('Authorization', `${authToken}`);
    return this.httpClient.put<User>(environment.apiUrl + 'user/update', userData, { headers });
  }

  getProfilePic(): Observable<File[]> {
    const authToken = this.tokenService.get();
    const headers = new HttpHeaders().set('Authorization', `${authToken}`);
    const url = `${environment.apiUrl}user/upload`;
    return this.httpClient.get<File[]>(url, { headers });
  }

  getProfilePicById(userId: String): Observable<File[]> {
    const authToken = this.tokenService.get();
    const headers = new HttpHeaders().set('Authorization', `${authToken}`);
    const url = `${environment.apiUrl}user/upload/${userId}`;
    return this.httpClient.get<File[]>(url, { headers });
  }

  updateProfilePic(userId: String, input: HTMLInputElement) {
    const authToken = this.tokenService.get();
    const headers = new HttpHeaders().set('Authorization', `${authToken}`);
    const formData = new FormData();
    formData.append('file', input.files![0]);
    const url = `${environment.apiUrl}user/upload/update`;
    return this.httpClient.put<User>(url, formData, { headers });
  }

  getImageUrl(filename: string): string {
    return `${environment.apiUrl}assets/${filename}`;
  }
  
}
