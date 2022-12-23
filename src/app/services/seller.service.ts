import { EventEmitter, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { login, SignUp } from '../data-type';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SellerService {
  isSellerLoggedIn = new BehaviorSubject<boolean>(false);
  isLoginError = new EventEmitter<boolean>(false);

  constructor(private http: HttpClient, private router: Router) {}

  userSignUp(data: SignUp) {
    return this.http
      .post('http://localhost:3000/seller', data, { observe: 'response' })
      .subscribe((result) => {
        this.isSellerLoggedIn.next(true);

        localStorage.setItem('seller', JSON.stringify(result.body));

        this.router.navigate(['seller-home']);

        // console.warn('result', result);
      });
    // return false
  }
  reloadSeller() {
    if (localStorage.getItem('seller')) {
      this.isSellerLoggedIn.next(true);
      this.router.navigate(['seller-home']);
    }
  }

  userLogin(data: login) {
    this.http
      .get<login[]>(
        `http://localhost:3000/seller?email=${data.email}&password=${data.password}`,
        { observe: 'response' }
      )
      .subscribe((result) => {
        // console.warn(result);
        if (result && result.body && result.body.length) {
          // alert('login succsess')

          localStorage.setItem('seller', JSON.stringify(result.body));

          this.router.navigate(['seller-home']);
        } else {
          // alert('login failed')
          this.isLoginError.emit(true);
        }
      });
  }
}
