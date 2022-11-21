import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class InvoiceService {

  private url: string = 'http://localhost:8000/api/invoices';
  private haders: any;

  constructor(private http: HttpClient) {
    this.haders = new HttpHeaders({
      'Content-Type':'application/json',
      'Authorization': 'bearer ' + sessionStorage.getItem(environment.TOKEN)
    });
  }

  public getInvoices(){
    return this.http.get(this.url, {headers: this.haders});
  }

  public getInvoice(id:any){
    return this.http.get(`${this.url}/${id}`, {headers: this.haders});
  }

  public addInvoice(invoice:any){
    return this.http.post(this.url, JSON.stringify(invoice), {headers: this.haders});
  }

  public updateInvoice(id:any, invoice:any){
    return this.http.put(`${this.url}/${id}`, JSON.stringify(invoice), {headers: this.haders});
  }

  public deleteInvoice(id:any){
    return this.http.delete(`${this.url}/${id}`, {headers: this.haders});
  }
}
