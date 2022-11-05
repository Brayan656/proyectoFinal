import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/_model/user';
import { UserService } from 'src/app/_service/user.service';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';

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

  status: boolean = false;

  constructor(private formBuilder: FormBuilder,
              private router: Router,
              private userService:UserService) { }

  ngOnInit(): void {
    sessionStorage.clear()
  }

  onSubmit() { 
    let email=this.elemento.value.usuario;
    let password= this.elemento.value.contraseña;
    this.router.navigate(['/'])
    this.userService.login(email, password).subscribe((data:any)=>{
      sessionStorage.setItem(environment.TOKEN, data.token)
      sessionStorage.setItem("username", data.username.userName)
      location.reload()
    }, err =>{
      this.router.navigate(['/login'])
      this.elemento.controls['usuario'].setValue('');
      this.elemento.controls['contraseña'].setValue('');
      Swal.fire(
        '',
        'Usuario o contraseña incorrecta',
        'warning'
      )
    });
  }

  onClose(){
    this.router.navigate(['/login']);
  }
}
