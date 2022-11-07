import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { InvoiceService } from '../../../_service/invoice.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  invoices : any[] = [];

  constructor(
    private router: Router,
    private invoiceService : InvoiceService
    ) { }

  ngOnInit(): void {
    this.invoiceService.getInvoices().subscribe((data:any) =>{
      console.log(data);
      this.invoices = data.invoices;
    }, err =>{
      console.log(err)
    })
  }

  deleteInvoice(id:any){

  }

}
