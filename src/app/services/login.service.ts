import { Injectable, signal } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { EnvironmentService } from './environment.service';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  userLoggedIn = signal(false);
  loginInProgress = signal(false);

  constructor(
    private http: HttpClient,
    private cookie: CookieService,
    private environmentService: EnvironmentService
  ) {
    if (this.cookie.check('auth_token') && this.cookie.check('expires_in')) {
      const expiresIn = new Date(parseInt(this.cookie.get('expires_in')));

      if (expiresIn < new Date()) {
        this.userLoggedIn.set(false);
        this.cookie.deleteAll();
        window.location.reload();
      } else {
        this.userLoggedIn.set(true);
      }
    }
  }

  public register(username: String, password: String): void {
    this.loginInProgress.set(true);
    this.http.post(
      this.environmentService.getRegisterUrl(),
      {username, password}
    ).subscribe({
      next: () => {
        this.login(username, password);
      },
      error: (error: HttpErrorResponse) => {
        this.loginInProgress.set(false);
        if (error.error.error == 'Username already exists') {
          window.alert('Benutzername nicht verfügbar');
          return;
        }
        window.alert('Unbekannter Fehler');
      }
    });
  }

  public login(username: String, password: String): void {
    this.loginInProgress.set(true);
    const params = new HttpParams()
      .set('username', username.toString())
      .set('password', password.toString());
    this.http.get(
      this.environmentService.getLoginUrl(),
      {params}
    ).subscribe({
      next: (response: any) => {
        this.cookie.set('auth_token', response.access_token);
        this.cookie.set('expires_in', (Date.now() + (response.expires_in * 1000)).toString());
        this.cookie.set('user_id', response.user_id.toString());

        this.loginInProgress.set(false);
        this.userLoggedIn.set(true);
      },
      error: (error: HttpErrorResponse) => {
        this.loginInProgress.set(false);
        if (error.error.error == 'Invalid credentials') {
          window.alert('Falsches Passwort oder Benutzername');
          return;
        }
        window.alert('Unbekannter Fehler');
      }
    });
  }

  public logout(): void {
    this.loginInProgress.set(true);
    this.cookie.deleteAll();
    this.userLoggedIn.set(false);
    this.loginInProgress.set(false);
    window.location.reload();
  }

  public getAuthToken(): string {
    return this.cookie.get('auth_token');
  }

  public getUserID(): string {
    return this.cookie.get('user_id');
  }
}
