import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { LoginService } from "../login/login.service";
import { PRODUCTION } from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class ChatInputService {
  constructor(
      private http: HttpClient,
      private loginService: LoginService
  ) {}

  public saveMessage(contactID: string, message: string): Observable<any> {
    const body = {
      recipientID: contactID,
      message: message,
      isGroup: false
    };
    return this.http.post(
      `${PRODUCTION}/saveMessage`,
      body,
      {
        headers: new HttpHeaders({
          'Authorization': `Bearer ${this.loginService.getAuthToken()}`,
        })
      }
    );
  }
}
