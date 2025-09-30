import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

/**
 * PUBLIC_INTERFACE
 * Provides a simple wrapper around HttpClient to call backend APIs with a base URL.
 */
@Injectable({ providedIn: 'root' })
export class ApiService {
  private http = inject(HttpClient);
  /**
   * Reads API base URL from environment variable at runtime (injected via globalThis).
   * If not set, defaults to '/api'.
   */
  private baseUrl = (globalThis as any)?.env?.EDUCHAT_API_BASE || '/api';

  /** PUBLIC_INTERFACE */
  get<T>(path: string, headers?: HttpHeaders): Observable<T> {
    return this.http.get<T>(`${this.baseUrl}${path}`, { headers }).pipe(catchError(this.handle));
  }

  /** PUBLIC_INTERFACE */
  post<T>(path: string, body: unknown, headers?: HttpHeaders): Observable<T> {
    return this.http.post<T>(`${this.baseUrl}${path}`, body, { headers }).pipe(catchError(this.handle));
  }

  /** PUBLIC_INTERFACE */
  put<T>(path: string, body: unknown, headers?: HttpHeaders): Observable<T> {
    return this.http.put<T>(`${this.baseUrl}${path}`, body, { headers }).pipe(catchError(this.handle));
  }

  /** PUBLIC_INTERFACE */
  delete<T>(path: string, headers?: HttpHeaders): Observable<T> {
    return this.http.delete<T>(`${this.baseUrl}${path}`, { headers }).pipe(catchError(this.handle));
  }

  private handle(err: HttpErrorResponse) {
    console.error('API error', err);
    return throwError(() => err);
  }
}
