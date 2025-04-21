import { Injectable, signal } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { EnvironmentService } from './environment.service';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  userLoggedIn = signal(this.cookie.check('auth_token'));

  constructor(
    private http: HttpClient,
    private cookie: CookieService,
    private environmentService: EnvironmentService
  ) {
  }

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

        this.userLoggedIn.set(true);
      },
      error: () => console.error('Login error')
    });
  }

  public logout(): void {
    this.http.post(
      this.environmentService.getLogoutUrl(),
      {},
      {headers: new HttpHeaders({'Authorization': `Bearer ${this.getAuthToken()}`})}
    ).subscribe({
        next: () => {
          console.log('Logout successful');
          this.cookie.delete('auth_token');
          this.cookie.delete('expires_in');
          this.userLoggedIn.set(false);
        },
        error: () => console.error('Logout error')
      }
    );
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
