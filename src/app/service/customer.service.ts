import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { catchError, retry } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { CustomerDTO } from '../DTO/customer.DTO';

@Injectable()
export class CustomerService {

    constructor(private http: HttpClient) { }

    customerService(customerDTO: CustomerDTO): Observable<any> {
        console.log(JSON.stringify(customerDTO));
        const headers = new HttpHeaders().set('Content-Type', 'application/json; charset=utf-8');
        return this.http.post<any>('http://localhost:4211/customer',
            JSON.stringify(customerDTO), {headers: headers}).pipe();
        }
}