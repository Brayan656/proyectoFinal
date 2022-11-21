import { Component, OnInit, ViewChild } from '@angular/core';
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


  @ViewChild("fileInput") fileInput: any;

  producto!: Product;
  archivos:any=[]
  
  elemento = new FormGroup({
    nombre: new FormControl(),
    descripcion: new FormControl(),
    precioUnidad: new FormControl(),
    stock: new FormControl(),
    imagenes: new FormControl('')    
  });

  constructor(private userService:UserService, 
              private productService:ProductService,
              private router: Router,
              private formBuilder: FormBuilder,) { }

  ngOnInit(): void {
    if (sessionStorage.getItem(environment.TOKEN) == null){
      window.alert('para hacer esto debe iniciar sesión')
      this.router.navigate(['/login'])
    }else{
      this.userService.validateToken(sessionStorage.getItem(environment.TOKEN)).subscribe((data : any) => {
        console.log(data.msg)
        if (data.msg){
          console.log('siguiente llamado')
        } else {
          window.alert('token inválido')
          sessionStorage.clear()
          this.router.navigate(['/login']);
        }
      });
    }
  }
  onSubmit() {  
    
    
    this.producto = new Product();

    this.producto.nombre=this.elemento.value.nombre;
    this.producto.descripcion=this.elemento.value.descripcion;
    this.producto.precioUnidad=this.elemento.value.precioUnidad;
    this.producto.stock=this.elemento.value.stock;
    
    //let img:File=this.elemento.value.imagenes;
    //console.log(img);
    let cantImagenes=this.archivos.length;

    
    this.productService.productAdd(this.producto).subscribe((data:any)=>{
      //console.log(data.idProduct);
      //for (let i = 0; i < cantImagenes; i++) {

        const formData = new FormData();
        formData.append('imagenes', this.elemento.controls['imagenes'].value!);
        formData.append('file', this.fileInput.nativeElement.files[0]);

        this.productService.imageAdd(data.idProduct,formData).subscribe(img=>{
          console.log(img);
          this.router.navigate(['/list']);
        }); 
      //}
      
    });
    

    
  }

  onClose(){
    this.router.navigate(['/list']);
  }


  
}
