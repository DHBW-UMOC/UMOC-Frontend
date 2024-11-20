import {Injectable} from "@angular/core";
import {Message} from "../model/message.model";
import {Contact} from "../model/contact.model";
import {HttpClient, HttpParams} from "@angular/common/http";
import {map, Observable} from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class ChatService {
    constructor(private http: HttpClient) {
    }

    public fetchChatHistory(sessionID: string, contactID: string): Observable<Message[]> {
        return this.http.get<any[]>(
            "http://localhost:5000/getContactMessages",
            {
                params: new HttpParams()
                    .append('sessionID', sessionID)
                    .append('contactID', contactID)
            }
        ).pipe(
            map(messages => messages.map(message =>
                new Message(
                    message.content,
                    message.send_at,
                    message.sender_user_id
                )
            ))
        );
    }
}
