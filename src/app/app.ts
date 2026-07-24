import { Component, inject, signal } from '@angular/core';
import { RouterOutlet, RouterLink, Router } from '@angular/router';
import { AuthService } from './core/auth/auth.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  protected readonly title = signal('studymate');
  private router = inject(Router);
  protected auth = inject(AuthService);

  logoutClick() {
    this.auth.logout();
    this.router.navigate(['/login']);
  }
}
