import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Barter } from '../interfaces/barter';


@Injectable({
  providedIn: 'root',
})
export class BarterService {
  private apiUrl = 'http://localhost:3000/barter';

  constructor(private http: HttpClient) {}

  createBarter(barterData: Barter): Observable<Barter> {
    return this.http.post<Barter>(this.apiUrl, barterData);
  }
}
