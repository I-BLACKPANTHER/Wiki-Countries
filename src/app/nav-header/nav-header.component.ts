import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav-header',
  templateUrl: './nav-header.component.html',
  styleUrls: ['./nav-header.component.scss'],
})
export class NavHeaderComponent {
  @Input() isAuth = false;

  constructor(private router: Router) {}

  ngOnInit() {
    console.log(this.isAuth);
  }

  LogIn = () => {
    this.isAuth = true;
    this.router.navigate(['/login']);
  };

  LogOut = () => {
    this.router.navigate(['/home']);
  };
}
