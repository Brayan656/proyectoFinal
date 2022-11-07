import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { InvoiceService } from 'src/app/_service/invoice.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit {

  form! : FormGroup;

  items: any[] = [];
  disabled:boolean = false;

  constructor(private route : Router,
    private invoiceService : InvoiceService) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      userid : new FormControl(0),
      itemid : new FormControl('', Validators.required),
      unitprice : new FormControl('', Validators.required),
      quantity : new FormControl('', Validators.required),
      invoicetotal : new FormControl({value:'', disabled: true})
    })
  }
  setUnitPrice(){
    this.form.controls['invoicetotal'].setValue(
      Number(this.form.controls['unitprice'].value) * Number(this.form.controls['quantity'].value));
  }

  onSave(){
    this.form.controls['invoicetotal'].enable();
    this.invoiceService.addInvoices(this.form.value).subscribe((data:any) =>{
      Swal.fire(
        '',
        'Factura creada con éxito.',
        'success'
      )
      this.route.navigate(['invoice']);
    }, err =>{
      console.log(err)
    })
  }

  onClose(){
    this.route.navigate(['/invoice']);
  }

}
