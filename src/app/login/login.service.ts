import {Injectable} from "@angular/core";
import {HttpClient, HttpParams} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private _sessionID: string = "38e616ea-9852-4ae7-a7eb-b534a526f026";

  constructor(private http: HttpClient) {
  }

  public login(username:string, password: string): void {
    this.http.get<string>(
      "https://localhost:5001/login",
      { params: new HttpParams()
          .append('username', username)
          .append('password', password)
      }
    ).subscribe(sessionID => this._sessionID = sessionID, error => console.log("Login attempt failed:" + error.message));
  }

  get sessionID(): string {
    if (!this._sessionID) {
      return "session-id";
    }
    return this._sessionID;
  }
}
