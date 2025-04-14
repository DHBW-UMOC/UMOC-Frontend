import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ChatInputService {
  constructor(private http: HttpClient) {}

  public saveMessage(sessionID: string, contactID: string, message: string): Observable<any> {
    const body = {
      sessionID: sessionID,
      recipientID: contactID,
      content: message
    };
    console.log('Request Body:', body);
    return this.http.post(
      'http://0.0.0.0:5000/saveMessage',
      body,
      {
        headers: new HttpHeaders({
          'Content-Type': 'application/json'
        })
      }
    );
  }
}
