import { Component} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { LoginService } from './login.service';

@Component({
    selector: 'login-field',
    imports: [CommonModule, ReactiveFormsModule],
    templateUrl: './login.component.html',
    styleUrl: './login.component.scss'
})
export class LoginComponent {
    loginForm: FormGroup;

    constructor(
        private formBuilder: FormBuilder,
        private loginService: LoginService
    ) {
        this.loginForm = this.formBuilder.group({
            username: ['', [Validators.required]],
            password: ['', [Validators.required]]
        });
    }

    onSubmit(): void {
        if (this.loginForm.invalid) {
            return;
        }
        this.loginService.login(this.loginForm.controls['username'].value, this.loginForm.controls['password'].value);
    }
}
