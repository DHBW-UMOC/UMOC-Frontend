import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AppComponent } from './app.component';
import { ChatWindowComponent } from './chat-window/chat-window.component';
import { ChatsComponent } from './chats/chats.component';

export const routes: Routes = [
    { path: '', redirectTo: 'chats', pathMatch: 'full' },
    { path: 'chats', component: ChatsComponent },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent }
];
