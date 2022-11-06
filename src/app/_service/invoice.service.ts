import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class InvoiceService {

  private url: string = 'http://127.0.0.1:8000/api/invoices';
  private haders: any;

  constructor(private http: HttpClient) {
    this.haders = new HttpHeaders({
      'Content-Type':'application/json',
      'Authorization': 'bearer ' + sessionStorage.getItem(environment.TOKEN)
    });
  }

  public getInvoices(){
    return this.http.get(this.url, {headers : this.haders});
  }
}
