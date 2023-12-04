import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TokenService } from './token.service';
import { Transaction } from '../interfaces/transaction';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { Barter } from '../interfaces/barter';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {

  constructor(private httpClient: HttpClient, private tokenService: TokenService) {}

  createTransaction(transactionData: Transaction): Observable<Transaction> {
    const authToken = this.tokenService.get();
    const headers = new HttpHeaders().set('Authorization', `${authToken}`);
    return this.httpClient.post<Transaction>(`${environment.apiUrl}transaction`, transactionData, { headers });
  }

  getTransactionById(transactionId: string): Observable<Transaction> {
    const authToken = this.tokenService.get();
    const headers = new HttpHeaders().set('Authorization', `${authToken}`);
    return this.httpClient.get<Transaction>(`${environment.apiUrl}transaction/${transactionId}`, { headers });
  }

  getConsumerTransactions(): Observable<Transaction[]> {
    const authToken = this.tokenService.get();
    const headers = new HttpHeaders().set('Authorization', `${authToken}`);
    return this.httpClient.get<Transaction[]>(`${environment.apiUrl}transaction/consumer`, { headers });
  }

  getOffererTransactions(): Observable<Transaction[]> {
    const authToken = this.tokenService.get();
    const headers = new HttpHeaders().set('Authorization', `${authToken}`);
    return this.httpClient.get<Transaction[]>(`${environment.apiUrl}transaction/offerer`, { headers });
  }

  updateTransaction(transactionId: string, transactionData: {}){
    const authToken = this.tokenService.get();
    const headers = new HttpHeaders().set('Authorization', `${authToken}`);
    return this.httpClient.put<Transaction>(`${environment.apiUrl}transaction/update/${transactionId}`, transactionData, { headers });
  }

}
