import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Imagen } from 'src/app/_model/imagen';
import { Product } from 'src/app/_model/product';
import { ProductService } from 'src/app/_service/product.service';

@Component({
  selector: 'app-see',
  templateUrl: './see.component.html',
  styleUrls: ['./see.component.css']
})
export class SeeComponent implements OnInit {

  public produ=new Product();
  public imagen=new Imagen();

  elemento = new FormGroup({
    idProduct:new FormControl(),
    nombre: new FormControl(),
    descripcion:new FormControl(),
    precioUnidad:new FormControl(),
    stock:new FormControl(),


    imagen:new FormControl()
  });


  constructor(private activatedRouter: ActivatedRoute,
    private router: Router,
    private producService:ProductService,
    private formBuilder: FormBuilder,) { 
      this.activatedRouter.params.subscribe(
        params => {
          this.getProduct(params['id']);
        }
      )
    }

  ngOnInit(): void {
  }

  getProduct(id:number){
    this.producService.productlistById(id).subscribe(data=>{
      this.produ.idProduct=data.idProduct;
      this.produ.descripcion=data.descripcion;
      this.produ.nombre=data.nombre;
      this.produ.precioUnidad=data.precioUnidad;
      this.produ.stock=data.stock;
      console.log(data);
      this.getImage(this.produ.idProduct);
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
  onSubmit(){

  }
}
