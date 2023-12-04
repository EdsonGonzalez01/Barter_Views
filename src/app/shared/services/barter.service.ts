import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Barter } from '../interfaces/barter';
import { File } from '../interfaces/file';
import { environment } from 'src/environments/environment';
import { TokenService } from './token.service';


@Injectable({
  providedIn: 'root',
})
export class BarterService {

  constructor(private http: HttpClient, private tokenService: TokenService) {}

  createBarter(barterData: Barter): Observable<Barter> {
    return this.http.post<Barter>(`${environment.apiUrl}barter`, barterData);
  }

  upload(id: string, input: HTMLInputElement): Observable<File> {
    const formData = new FormData();
    formData.append('file', input.files![0]);
    const url = `${environment.apiUrl}barter/${id}/upload`;
    const authToken = this.tokenService.get();
    const headers = new HttpHeaders().set('Authorization', `${authToken}`);
    return this.http.post<File>(url, formData, {headers});
  }

  getBarters(): Observable<Barter[]>{
    const url = `${environment.apiUrl}barter`;
    return this.http.get<Barter[]>(url);
  }

  getBarterById(barterId: string): Observable<Barter>{
    const authToken = this.tokenService.get();
    const headers = new HttpHeaders().set('Authorization', `${authToken}`);
    const url = `${environment.apiUrl}barter/${barterId}`;
    return this.http.get<Barter>(url, {headers});
  }


  getMyBarters(): Observable<Barter[]>{
    const url = `${environment.apiUrl}barter/mybarters`;
    const authToken = this.tokenService.get();
    const headers = new HttpHeaders().set('Authorization', `${authToken}`);
    return this.http.get<Barter[]>(url, {headers});
  }

  getFiles(barterId: String):Observable<File[]>{
    const url = `${environment.apiUrl}barter/${barterId}/upload`;
    return this.http.get<File[]>(url);
  }

  getImageUrl(filename: string): string {
    return `${environment.apiUrl}assets/${filename}`;
  }

  updateBarter(barterId: String, barterData: {}){
    const authToken = this.tokenService.get();
    const headers = new HttpHeaders().set('Authorization', `${authToken}`);
    return this.http.put<Barter>(`${environment.apiUrl}barter/update/${barterId}`, barterData, { headers });
  }

  updateBarterPic(barterId: String, input: HTMLInputElement) {
    const authToken = this.tokenService.get();
    const headers = new HttpHeaders().set('Authorization', `${authToken}`);
    const formData = new FormData();
    formData.append('file', input.files![0]);
    const url = `${environment.apiUrl}barter/upload/update/${barterId}`;
    return this.http.put<Barter>(url, formData, { headers });
  }
}
