import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from './models/login.model';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private apiUrl = 'http://localhost:3000/api/userlogin/login';

  constructor(private http: HttpClient) { }

  loginUser(userData: User): Observable<any> {
    return this.http.post(this.apiUrl, userData);
  }
}
