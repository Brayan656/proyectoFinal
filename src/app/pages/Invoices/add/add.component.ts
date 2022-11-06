import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit {

  form! : FormGroup;

  items: any[] = [];
  disabled:boolean = false;

  constructor(private route : Router) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      userid : new FormControl(0),
      itemid : new FormControl('', Validators.required),
      unitprice : new FormControl({value:'', disabled: true}, Validators.required),
      quantity : new FormControl('', Validators.required),
      invoicetotal : new FormControl({value:'', disabled: true})
    })
  }
  setUnitPrice(item:any){
    console.log(item);
    this.form.controls['invoicetotal'].setValue(
      Number(this.form.controls['unitprice'].value) * Number(this.form.controls['quantity'].value));
  }

  onSave(){

  }

  onClose(){
    this.route.navigate(['/invoice']);
  }

}
