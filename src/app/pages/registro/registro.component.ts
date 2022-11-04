import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/_model/user';
import { UserService } from 'src/app/_service/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

  user!: User ;

  
  elemento = new FormGroup({
    user: new FormControl(),
    email: new FormControl(),
    password: new FormControl(),
  });

  constructor(private formBuilder: FormBuilder,
              private router: Router,
              private userService: UserService) { }

  ngOnInit(): void {
  }

  onSubmit() {  
    this.user= new User()  
    //console.warn(this.elemento.value); 
    this.user.userName=this.elemento.value.user;
    this.user.userEmail=this.elemento.value.email;
    this.user.passwordHash=this.elemento.value.password;
    //console.log(this.user);

    this.userService.registro(this.user).subscribe(data=>{
      Swal.fire(
        '',
        'Usuario creado con éxito..',
        'success'
      )
    })

    this.router.navigate(['/login']);
  }

  onClose(){
    this.router.navigate(['/login']);
  }

}
