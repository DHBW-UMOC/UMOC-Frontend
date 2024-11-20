import {Injectable} from "@angular/core";
import {Message} from "../model/message.model";

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  constructor() {
  }

  public fetchChatHistory(sessionID: string): Array<Message> {
    //TODO: Actually get some Data
    return [{message: "Lorem ipsum dolor sit amet"}, {message: "consetetur sadipscing elitr"}, {message: "sed diam nonumy eirmod tempor invidunt ut labore"}, {message: "et dolore magna aliquyam erat"}, {message: "sed diam voluptua"}];
  }
}
