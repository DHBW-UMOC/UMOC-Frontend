import { EventEmitter, Injectable, Output } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { EnvironmentService } from './environment.service';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  constructor(
    private http: HttpClient,
    private cookie: CookieService,
    private environmentService: EnvironmentService
  ) {
  }

  @Output() userLoggedIn = new EventEmitter<boolean>();

  public login(username: String, password: String): void {
    const params = new HttpParams()
      .set('username', username.toString())
      .set('password', password.toString());
    this.http.get(
      this.environmentService.getLoginUrl(),
      {params}).subscribe({
      next: (response: any) => {
        const {access_token, expires_in, user_id} = response;
        this.cookie.set('auth_token', access_token);
        this.cookie.set('expires_in', expires_in.toString());
        this.cookie.set('userID', user_id.toString());
        this.userLoggedIn.emit(true);
      },
      error: (error) => {
        console.error('Login error:', error);
      }
    });
  }

  public logout(): void {
    this.cookie.delete('auth_token');
    this.cookie.delete('expires_in');
    this.userLoggedIn.emit(false);
    window.location.reload();
  }

  public isLoggedIn(): boolean {
    return this.cookie.check('auth_token');
  }

  public getAuthToken(): string {
    return this.cookie.get('auth_token');
  }

  public getTimeLeft(): string {
    return this.cookie.get('expires_in');
  }

  public getUserID(): string {
    return this.cookie.get('userID');
  }
}
