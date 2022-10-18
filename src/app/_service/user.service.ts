import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { User } from '../_model/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private url: string = `${environment.HOST}Users/`;

  constructor(private http: HttpClient) { }

  public registro(user: User) {
    return this.http.post<any>(this.url + 'Registro', {
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
}
