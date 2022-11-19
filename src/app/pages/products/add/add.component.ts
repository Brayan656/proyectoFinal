import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Product } from 'src/app/_model/product';
import { ProductService } from 'src/app/_service/product.service';
import { UserService } from 'src/app/_service/user.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit {
  producto!: Product;
  archivos:any=[]
  
  elemento = new FormGroup({
    nombre: new FormControl(),
    descripcion: new FormControl(),
    precioUnidad: new FormControl(),
    stock: new FormControl(),
    imagenes: new FormControl(),
  });

  constructor(private userService:UserService, 
              private productService:ProductService,
              private router: Router,
              private formBuilder: FormBuilder,) { }

  ngOnInit(): void {
    /*
    if (sessionStorage.getItem(environment.TOKEN) == null){
      window.alert('Para hacer esto debe iniciar sesión')
      this.router.navigate(['/login'])
    }else{
      this.userService.validateToken(sessionStorage.getItem(environment.TOKEN)).subscribe((data : any) => {
        console.log(data.msg)
        if (data.msg){
          console.log('siguiente llamado')
        } else {
          window.alert('Token inválido')
          sessionStorage.clear()
          this.router.navigate(['/login']);
        }
      });
    }
    */
  }
  onSubmit() {  
    
    
    this.producto = new Product();

    this.producto.nombre=this.elemento.value.nombre;
    this.producto.descripcion=this.elemento.value.descripcion;
    this.producto.precioUnidad=this.elemento.value.precioUnidad;
    this.producto.stock=this.elemento.value.stock;
    
    let img:File=this.elemento.value.imagenes;
    console.log(img);
    let cantImagenes=this.archivos.length;

    
    //this.productService.productAdd(this.producto).subscribe((data:any)=>{
      //console.log(data.idProduct);
      //for (let i = 0; i < cantImagenes; i++) {
        this.productService.imageAdd(1,this.elemento.value.imagenes).subscribe(img=>{
          console.log(img);
        });
      //}
      
    //});
    

    //this.router.navigate(['/list']);
  }

  onClose(){
    //this.router.navigate(['/list']);
  }


  public capturarFie(event: any):any{
    //console.log(event.target.files);
    if (this.archivos.length>0) {
      for (let index = 0; index <= this.archivos.length; index++) {
        this.archivos.pop();
      }
    }
    //console.log(this.archivos.length);

    let cant =event.target.files.length
    
    let images:any=event.target.files;
    for (let index = 0; index < cant; index++) {    
      this.archivos.push(images[index]);
    }
    //console.log(this.archivos);
  }
}
