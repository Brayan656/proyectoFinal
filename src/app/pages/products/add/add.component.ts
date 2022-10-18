import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/_service/user.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit {

  constructor(private userService:UserService, private router: Router) { }

  ngOnInit(): void {
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
  }

}
