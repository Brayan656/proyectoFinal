import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Imagen } from 'src/app/_model/imagen';
import { Product } from 'src/app/_model/product';
import { ProductService } from 'src/app/_service/product.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {
  //public produ=new Product();
  public imagen=new Imagen();

  p=new Product();

  @ViewChild("fileInput") fileInput: any;

  elemento = new FormGroup({
    idProduct:new FormControl(),
    nombre: new FormControl(),
    descripcion:new FormControl(),
    precioUnidad:new FormControl(),
    stock:new FormControl(),


    imagen:new FormControl()
  });

  constructor(private producService:ProductService,
    public dialogRef: MatDialogRef<EditComponent>,
    private router: Router,
    @Inject(MAT_DIALOG_DATA) public data: any,public dialog:MatDialog,
    private formBuilder: FormBuilder,) { }

  ngOnInit(): void {
    console.log(this.data);
    let id:number=this.data.id;
console.log(id)
    this.getProduct(id);

  }
  getProduct(id:number){
    this.producService.productlistById(id).subscribe(data=>{
      this.elemento.patchValue(data);
      this.getImage(this.elemento.controls['idProduct'].value);
    });
  }
  getImage(id:number){
    try {
      this.producService.imageListByProduct(id).subscribe(data=>{
        this.imagen.idImagen=data[0].idImagen;
        this.imagen.imagen=data[0].imagen;
        console.log(this.imagen.imagen);
      });
    } catch (error) {
      this.imagen.imagen='Imagen no encontrada'
    }
  }

  onSubmit() {
    const formData = new FormData();
        formData.append('imagenes', this.elemento.controls['imagen'].value!);
        formData.append('file', this.fileInput.nativeElement.files[0]);

    if(formData.get('file')!.length > 0 ){
      this.producService.prodctupdate(this.elemento.value).subscribe(datos=>{
        Swal.fire(
          '',
          "Producto actualizado correctamente",
          'success'
        )
        this.router.navigate(['/list']);
      });
    }else{
      this.producService.imageUpdate(this.imagen.idImagen,formData).subscribe(subir=>{
        this.producService.prodctupdate(this.elemento.value).subscribe(datos=>{
          Swal.fire(
            '',
            "Producto actualizado correctamente",
            'success'
          )
          this.router.navigate(['/list']);
        });
      });
    }
  }
}
