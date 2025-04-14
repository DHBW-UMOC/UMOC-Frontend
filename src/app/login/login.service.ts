import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";
import { Observable, tap, catchError, of } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private _sessionID: string = "00000000-0000-0000-1111-000000000001"; // Default value for development
  private readonly baseUrl = "http://0.0.0.0:5000"; // API base URL

  constructor(private http: HttpClient) {}

  /**
   * Authenticate user and receive session ID
   * @param username User's username
   * @param password User's password
   * @returns Observable containing login result
   */
  public login(username: string, password: string): Observable<any> {
    return this.http.get<any>(
      `${this.baseUrl}/login`,
      { 
        params: new HttpParams()
          .append('username', username)
          .append('password', password)
      }
    ).pipe(
      tap(response => {
        if (response && response.sessionID) {
          this._sessionID = response.sessionID;
        }
      }),
      catchError(error => {
        console.error("Login attempt failed:", error);
        return of({ error: error.message || "Authentication failed" });
      })
    );
  }

  /**
   * End user's session
   * @returns Observable containing logout result
   */
  public logout(): Observable<any> {
    return this.http.post<any>(
      `${this.baseUrl}/logout`,
      { sessionID: this._sessionID }
    ).pipe(
      tap(() => {
        this._sessionID = "";
      }),
      catchError(error => {
        console.error("Logout failed:", error);
        return of({ error: error.message || "Logout failed" });
      })
    );
  }

  /**
   * Get current session ID
   */
  get sessionID(): string {
    return this._sessionID;
  }
}
