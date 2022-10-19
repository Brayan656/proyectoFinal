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

  name: string | undefined;

  constructor(private router: Router){}
  
  ngOnInit() {
    if (sessionStorage.getItem('username') != null){
      this.name = sessionStorage.getItem('username')!
    }
  }

  public logout(){
    sessionStorage.clear()
    location.reload()
  }
}

