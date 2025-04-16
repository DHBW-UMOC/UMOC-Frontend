import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ContactListComponent } from "./contact-list/contact-list.component";
import { ChatWindowComponent } from "./chat-window/chat-window.component";

@Component({
    selector: 'app-root',
    imports: [RouterOutlet, ContactListComponent, ChatWindowComponent],
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'umoc-frontend';
}
