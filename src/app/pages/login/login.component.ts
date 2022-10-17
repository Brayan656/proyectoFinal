import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  
  link!: string;

  
  elemento = new FormGroup({
    usuario: new FormControl(),
    contraseña: new FormControl(),
    
  });

  constructor(private formBuilder: FormBuilder,
              private router: Router) { }

  ngOnInit(): void {
  }
  onSubmit() {
    /*
    //console.warn(this.elemento.value); 
    this.ob.title=this.elemento.value.titulo;
    this.ob.image=this.elemento.value.url;
    //console.log(this.ob);

    this.tiendaFalsaService.crear(this.ob).subscribe(data=>{
      console.log(data);
      //this.data=data;
    });*/
  }

  onClose(){
    this.router.navigate(['/list']);
  }
}
