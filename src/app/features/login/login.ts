import { Component, inject } from '@angular/core';
import { AuthService } from '../../core/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login {
  auth = inject(AuthService);
  router = inject(Router);

  loginClick() {
    this.auth.login();
    this.router.navigate(['/topics']);
  }
}
