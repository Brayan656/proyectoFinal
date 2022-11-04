import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/_model/user';
import { UserService } from 'src/app/_service/user.service';
import { environment } from 'src/environments/environment';

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

    this.userService.login(email, password).subscribe(data=>{
      sessionStorage.setItem(environment.TOKEN, data.token)
      this.userService.getName(email, password).subscribe((response:any) => {
        sessionStorage.setItem("username", response.name)
      })
    });

    this.router.navigate(['/'])
  }

  onClose(){
    this.router.navigate(['/login']);
  }
}
