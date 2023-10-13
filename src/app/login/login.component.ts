import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { LoginService } from '../login.service';
import { User } from '../models/login.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  myForm: FormGroup;
  accessToken: string = '';
  isAuth = false;

  constructor(private loginService: LoginService, private router: Router) {
    this.myForm = new FormGroup({
      username: new FormControl(''),
      password: new FormControl(''),
    });
  }

  ngOnInit() {
    console.log(this.isAuth);
  }

  onSubmit = () => {
    this.isAuth = true;
    const userData: User = this.myForm.value;
    this.loginService.loginUser(userData).subscribe((response: any) => {
      this.accessToken = response.accessToken;
      console.log(this.accessToken);
      localStorage.setItem('accessToken', this.accessToken);
      console.log('Login successful');

      this.router.navigate(['/countries']);
    });
  };
}
