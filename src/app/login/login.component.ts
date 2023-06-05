import { Component, OnInit } from '@angular/core';

import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../model/User';
import { userservice } from '../services/user.service';


const USER_KEY = 'auth-user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  userauth: User = new User();
  errorMessage = 'Invalid Credentials';
  successMessage!: string;
  invalidLogin = false;
  public loginSuccess = false;

  constructor(private router: Router, private userser: userservice) {}

  ngOnInit(): void {}
Validator(control: User): boolean {
    if (control.email.length>5 && control.email.indexOf("@")!=-1 && control.password.length>7) {
        return  true ;
    }
    return false ;
}
  Login() {
   if (this.Validator(this.userauth))
{
    this.userser.getuserbyemail(this.userauth.email).subscribe(
      (data ) => {
        if (data != null)
        {
        if (this.userauth.password == data.password  && data.role=="admin") {
          window.sessionStorage.removeItem(USER_KEY);
          window.sessionStorage.setItem(
            USER_KEY,
            JSON.stringify(data)
          );
          this.invalidLogin = false;
          this.loginSuccess = true;

          this.successMessage = 'Login Successful.';
          this.router.navigate(['/stat']);
        } 
      }
      
    });
    
}
else{
  this. errorMessage = 'Email or Password incorrect.';
  this.invalidLogin=true
}
  }
}
