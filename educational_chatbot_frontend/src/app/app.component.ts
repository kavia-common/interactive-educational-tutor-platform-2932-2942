import { Component } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { DatePipe, NgFor, NgIf } from '@angular/common';
import { AuthService } from './core/services/auth.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive, DatePipe, NgFor, NgIf],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'EduAssist';
  sampleSessions = [
    { id: '1', title: 'Algebra practice', updated: new Date() },
    { id: '2', title: 'Newton laws intro', updated: new Date(Date.now() - 3600*1000) },
  ];
  sampleHistory = [
    { summary: 'Reviewed linear equations', time: new Date() },
    { summary: 'Discussed F=ma example', time: new Date(Date.now() - 2*3600*1000) },
  ];

  constructor(private auth: AuthService) {}

  // PUBLIC_INTERFACE
  logout(): void {
    /** Logs the user out and redirects to login page. */
    this.auth.logout();
  }
}
