import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { UserService } from './_service/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'ptoyectoFinal';
  showFiller = false;
  showLogout = false;

  name: string = "Tienda App";

  constructor(private router: Router){}
  
  ngOnInit() {
    let _name = sessionStorage.getItem('username')!
    if(_name != "" && _name != null){
      this.name = `Bienvenido ${_name}`;
      this.showLogout = true;
    }
  }

  public logout(){
    sessionStorage.clear()
    location.reload()
  }
}

