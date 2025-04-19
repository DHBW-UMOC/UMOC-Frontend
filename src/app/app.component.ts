import {Component, OnDestroy, OnInit} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ContactListComponent } from "./contact-list/contact-list.component";
import { ChatWindowComponent } from "./chat-window/chat-window.component";
import {NgIf} from "@angular/common";
import {LoginComponent} from "./login/login.component";
import {LoginService} from "./login/login.service";
import {Subscription} from "rxjs";

@Component({
    selector: 'app-root',
    imports: [RouterOutlet, ContactListComponent, ChatWindowComponent, NgIf, LoginComponent],
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit, OnDestroy{
    title = 'UMOC-Frontend';
    isLoggedIn: boolean = false;
    private loginSubscription: Subscription = new Subscription();

    constructor(private loginService: LoginService) {}

    ngOnInit(): void {
        this.isLoggedIn = this.loginService.isLoggedIn();
        this.loginSubscription = this.loginService.userLoggedIn.subscribe(
            (isLoggedIn: boolean) => this.isLoggedIn = isLoggedIn
        );
    }

    ngOnDestroy(): void {
        this.loginSubscription.unsubscribe();
    }

    logout() {
        this.loginService.logout()
    }
}
