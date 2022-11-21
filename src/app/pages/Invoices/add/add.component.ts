import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { InvoiceService } from 'src/app/_service/invoice.service';
import { UserService } from 'src/app/_service/user.service';
import Swal from 'sweetalert2';
import { ProductService } from '../../../_service/product.service';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit {

  form! : FormGroup;

  items: any[] = [];
  disabled:boolean = false;
  usersList: any[] = [];
  itemList:any[] = [];

  title:string = "Agregar Factura";
  invoiceid:any;
  qtyAvailable:any;
  productName : any;
  

  constructor(private route : Router,
    private invoiceService : InvoiceService, 
    private user : UserService,
    private curRoue: ActivatedRoute,
    private productService: ProductService) { }

  ngOnInit(): void {
    this.getUsers();
    this.getItems();

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
      this.title = "Editar factura N°"+this.invoiceid
      this.invoiceService.getInvoice(this.invoiceid).subscribe((data:any) =>{
        this.form.patchValue(data.invoices);
        this.getItemById2(this.form.controls['itemid'].value);
      });
    }
  }

  setUnitPrice(){
    this.form.controls['invoicetotal'].setValue(
      Number(this.form.controls['unitprice'].value) * Number(this.form.controls['quantity'].value));
  }

  onSave(){
    this.form.controls['invoicetotal'].enable();
    console.log(this.qtyAvailable)
    if(this.form.controls['quantity'].value > this.qtyAvailable ){
      Swal.fire(
        '',
        `El producto ${this.productName} tiene solo ${this.qtyAvailable} unidades disponibles`,
        'warning'
      )
      this.form.controls['invoicetotal'].disable();
      return;
    }

    if(this.invoiceid != null && this.invoiceid != ''){
      this.invoiceService.updateInvoice(this.invoiceid, this.form.value).subscribe((data:any) =>{
        if(data.success){
          Swal.fire(
            '',
            'Factura acualizada con éxito.',
            'success'
          )
          this.route.navigate(['invoice']);
        }else{
          Swal.fire(
            '',
             data.message,
            'error'
          );
          this.form.controls['invoicetotal'].disable();
          return;
        }
      }, err =>{
        this.form.controls['invoicetotal'].disable();
        console.log(err)
      });
    }else{
      this.invoiceService.addInvoice(this.form.value).subscribe((data:any) =>{
        if(data.success){
          Swal.fire(
            '',
            'Factura creada con éxito.',
            'success'
          );
          this.route.navigate(['invoice']);

        }else{
          Swal.fire(
            '',
             data.message,
            'error'
          );
          this.form.controls['invoicetotal'].disable();
          return;
        }
      }, err =>{
        console.log(err)
      });
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

  getItems(){
    this.productService.productlistAll().subscribe((data:any) => {
      this.itemList = data
    })
  }

  getItemById(id:any){
    this.productService.productlistById(id.value).subscribe((data:any) => {
      console.log(data)
      this.form.controls['unitprice'].setValue(data.precioUnidad);
      this.qtyAvailable = data.stock;
      this.productName = data.nombre;
      Swal.fire(
        '',
        `El producto ${data.nombre} tiene ${data.stock} unidades disponibles`,
        'success'
      )
      this.setUnitPrice();
    })
  }

  getItemById2(id:any){
    this.productService.productlistById(id).subscribe((data:any) => {
      console.log(data)
      this.form.controls['unitprice'].setValue(data.precioUnidad);
      this.qtyAvailable = data.stock;
      this.productName = data.nombre;
      Swal.fire(
        '',
        `El producto ${data.nombre} tiene ${data.stock} unidades disponibles`,
        'success'
      )
      this.setUnitPrice();
    })
  }

}
