import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { FoodCartService } from '../../../services/food-cart.service';
import { Router } from '@angular/router';
import { LoginReq, LoginRes } from '../../../models/models';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  constructor(private http: FoodCartService, private router: Router) { }

  ngOnInit() {
    this.loginForm = new FormGroup({
      mobileNumber: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required])
    });
  }

  validateUser() {
    this.http.checkLogin(this.loginForm.value).subscribe(
      (res: LoginRes) => {
        if (res.statusCode === 200) {
          sessionStorage.setItem('currentUser', JSON.stringify(res));
          this.router.navigate(['/doctor/dashboard']);
        }
      }
    );
  }

}
