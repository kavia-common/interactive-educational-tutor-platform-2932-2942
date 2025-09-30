import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from './api.service';
import { tap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';

export interface LoginResponse {
  token: string;
  user: { id: string; name: string; email: string };
}

/**
 * PUBLIC_INTERFACE
 * Handles authentication, token storage, and logout logic.
 */
@Injectable({ providedIn: 'root' })
export class AuthService {
  private api = inject(ApiService);
  private router = inject(Router);
  private tokenKey = 'educhat_token';

  // Minimal storage interface to avoid relying on global DOM lib during lint
  private get storage(): { getItem(k: string): string | null; setItem(k: string, v: string): void; removeItem(k: string): void } | null {
    try {
      return (globalThis as any)?.localStorage ?? null;
    } catch {
      return null;
    }
  }

  /** PUBLIC_INTERFACE */
  login(email: string, password: string): Observable<LoginResponse> {
    // Endpoint placeholder; backend must provide auth route
    return this.api.post<LoginResponse>('/auth/login', { email, password }).pipe(
      tap(res => {
        this.storage?.setItem(this.tokenKey, res.token);
      })
    );
  }

  /** PUBLIC_INTERFACE */
  logout(): void {
    this.storage?.removeItem(this.tokenKey);
    this.router.navigateByUrl('/chat');
  }

  /** PUBLIC_INTERFACE */
  getToken(): string | null {
    return this.storage?.getItem(this.tokenKey) ?? null;
  }

  /** PUBLIC_INTERFACE */
  isAuthenticated(): Observable<boolean> {
    return of(!!this.getToken());
  }
}
