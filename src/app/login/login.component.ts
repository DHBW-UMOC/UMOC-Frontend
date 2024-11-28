import { Component } from '@angular/core';
import { LoginFieldComponent } from "../login-field/login-field.component";
import { RegisterLoginGreetingComponent } from "../register-login-greeting/register-login-greeting.component";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [LoginFieldComponent, RegisterLoginGreetingComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

}
