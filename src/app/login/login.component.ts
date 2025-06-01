import { Component } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { LoginService } from '../services/login.service';
import { MatTab, MatTabGroup } from '@angular/material/tabs';
import { MatProgressSpinner } from '@angular/material/progress-spinner';

@Component({
  selector: 'login-field',
  imports: [CommonModule, ReactiveFormsModule, MatTabGroup, MatTab, MatProgressSpinner, NgOptimizedImage],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  loginForm: FormGroup = this.formBuilder.group({
    username: ['', [Validators.required]],
    password: ['', [Validators.required]]
  });

  registerForm: FormGroup = this.formBuilder.group({
    username: ['', [Validators.required]],
    password: ['', [Validators.required]],
    confirmPassword: ['', [Validators.required]]
  });

  constructor(
    private formBuilder: FormBuilder,
    protected loginService: LoginService
  ) {
  }

  onSubmitLogin(): void {
    if (this.loginForm.invalid) return;
    this.loginService.login(this.loginForm.controls['username'].value, this.loginForm.controls['password'].value);
  }

  onSubmitRegistration(): void {
    if (this.registerForm.invalid) return;
    this.loginService.register(this.registerForm.controls['username'].value, this.registerForm.controls['confirmPassword'].value);
  }
}
