import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { InvoiceService } from 'src/app/_service/invoice.service';
import { UserService } from 'src/app/_service/user.service';
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
  usersList: any[] = []

  title:string = "Agregar Factura";
  invoiceid:any;
  

  constructor(private route : Router,
    private invoiceService : InvoiceService, 
    private user : UserService,
    private curRoue: ActivatedRoute) { }

  ngOnInit(): void {
    this.getUsers()

    this.form = new FormGroup({
      userid : new FormControl(0),
      itemid : new FormControl('', Validators.required),
      unitprice : new FormControl('', Validators.required),
      quantity : new FormControl('', Validators.required),
      invoicetotal : new FormControl({value:'', disabled: true})
    })

    this.getData();
  }

  getData(){
    this.invoiceid = this.curRoue.snapshot.paramMap.get('id');
    if(this.invoiceid != null && this.invoiceid != ''){
      this.title = "Editar factura n°"+this.invoiceid
      this.invoiceService.getInvoice(this.invoiceid).subscribe((data:any) =>{
        this.form.patchValue(data.invoices);
      });
    }
  }

  setUnitPrice(){
    this.form.controls['invoicetotal'].setValue(
      Number(this.form.controls['unitprice'].value) * Number(this.form.controls['quantity'].value));
  }

  onSave(){
    this.form.controls['invoicetotal'].enable();

    if(this.invoiceid != null && this.invoiceid != ''){
      this.invoiceService.updateInvoice(this.invoiceid, this.form.value).subscribe((data:any) =>{
        Swal.fire(
          '',
          'Factura acualizada con éxito.',
          'success'
        )
        this.route.navigate(['invoice']);
      }, err =>{
        console.log(err)
      })
    }else{
      this.invoiceService.addInvoice(this.form.value).subscribe((data:any) =>{
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

    
  }

  onClose(){
    this.route.navigate(['/invoice']);
  }

  getUsers(){
    this.user.getUsers().subscribe((data:any) => {
      this.usersList = data
    })
  }

}
