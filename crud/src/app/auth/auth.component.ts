import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent {
  isSigningUp = false;
  constructor(private authService: AuthService, private router: Router) { }

  async onSignup(email: string, password: string) {
    try {
      const result = await this.authService.signup(email, password);
      // handle successful signup
      // for example, stay on the current page
      this.router.navigate(['/auth-si']); // replace '/auth-si' with the route of your signup page
      window.alert('You have successfully signed up!');
    } catch (error) {
      // handle signup error
      console.error('Signup error', error);
      window.alert('Signup failed!');
    }
  }
  async onSignin(email: string, password: string) {
    try {
      const result = await this.authService.signin(email, password);
      // handle successful signin
      // for example, navigate to a different page
      this.router.navigate(['/post-list']);
      window.alert('You have successfully signed in!');
    } catch (error) {
      // handle signin error
      console.error('Signin error', error);
      window.alert('Signin failed!');
    }
  }
  
}