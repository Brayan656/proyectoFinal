import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/_model/user';
import { UserService } from 'src/app/_service/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  elemento = new FormGroup({
    usuario: new FormControl(),
    contraseña: new FormControl(),
    
  });

  constructor(private formBuilder: FormBuilder,
              private router: Router,
              private userService:UserService) { }

  ngOnInit(): void {
  }
  onSubmit() {

    console.warn(this.elemento.value); 
    //console.log(this.ob);
    let email=this.elemento.value.usuario;
    let password= this.elemento.value.contraseña;
    this.userService.login(email,password).subscribe(data=>{
      console.log(data);
      //this.data=data;
    });
  }

  onClose(){
    this.router.navigate(['/login']);
  }
}
