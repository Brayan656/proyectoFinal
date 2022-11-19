import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
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
    this.getInvoice();
  }

  getInvoice(){
    this.invoiceService.getInvoices().subscribe((data:any) =>{
      console.log(data);
      this.invoices = data.invoices;
    }, err =>{
      console.log(err)
    })
  }

  deleteInvoice(id:any){

    Swal.fire({
      title: 'Está seguro de eliminar la factura?',
      showDenyButton: true,
      confirmButtonText: 'Aceptar',
      denyButtonText: `Cancelar`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        
        this.invoiceService.deleteInvoice(id).subscribe((data:any)=>{
          Swal.fire(
            'Factura eliminada con éxito.',
            '',
            'success'
          )
          this.getInvoice();
        });

      } else if (result.isDenied) {
        Swal.fire('Proceso cancelado', '', 'info')
      }
    })




  
  }

}
