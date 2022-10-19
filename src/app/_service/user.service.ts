import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '../_model/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private url: string = `${environment.HOST}Users/`;

  constructor(private http: HttpClient) { }

  public registro(user: User) {
    return this.http.post<any>(this.url + 'Register', {
      "userName": user.userName,
      "userEmail": user.userEmail,
      "password": user.passwordHash
    }
    );
  }

  public login(email: string, password: string) {
    return this.http.post<any>(this.url + 'Login', {
      "userEmail": email,
      "password": password
    });
  }

  public validateToken(token: any){
    return this.http.post<any>(this.url + 'ValidToken?token=' + token, null)
  }

  public getName(email: string, password: string){
    return this.http.post<any>(this.url + 'GetUserName', {
      "userEmail": email,
      "password": password
    })
  }
}
