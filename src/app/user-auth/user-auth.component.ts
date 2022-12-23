import { Component, OnInit } from '@angular/core';
import { login, SignUp } from '../data-type';
import {} from '../services/seller.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-user-auth',
  templateUrl: './user-auth.component.html',
  styleUrls: ['./user-auth.component.css'],
})
export class UserAuthComponent implements OnInit {
  showLogin = false;
  authError = '';
  constructor(private user: UserService) {}

  ngOnInit(): void {
    this.user.userAuthReload();
  }
  signUp(data: SignUp): void {
    this.user.userSignUp(data);
  }
  userlogin(data: login) {
    this.authError = '';
    this.user.userLogin(data);
    this.user.isLoginError.subscribe((error) => {
      if (error) {
        this.authError = 'Email or Password is Incorrect';
      }
    });
  }
  openLogin() {
    this.showLogin = false;
  }
  openSignUp() {
    this.showLogin = true;
  }
}
