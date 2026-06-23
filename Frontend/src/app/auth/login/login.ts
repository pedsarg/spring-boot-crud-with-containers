import { Component, ChangeDetectorRef } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule
} from '@angular/forms';

import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';

import { AuthService } from '../services/authService.js';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, RouterLink],
  templateUrl: './login.html',
  styleUrls: ['./login.css']
})
export class LoginComponent {

  loginForm: FormGroup;

  loading = false;
  errorMessage = '';

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private cdr: ChangeDetectorRef
  ) {

    this.loginForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(3)]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });

  }

  get username() {
    return this.loginForm.get('username');
  }

  get password() {
    return this.loginForm.get('password');
  }

  onSubmit() {

    this.errorMessage = '';

    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    this.loading = true;

    this.authService.login(this.loginForm.value).subscribe({

      next: (response) => {

        if (response.token) {
          localStorage.setItem('token', response.token);
        }

        this.router.navigate(['/home']);
      },

      error: (error) => {

        if (error.error?.error) {

          this.errorMessage = error.error.error;

        } else if (error.status === 401) {

          this.errorMessage = 'Invalid username or password';

        } else if (error.status === 0) {

          this.errorMessage = 'Unable to connect to server';

        } else {

          this.errorMessage = 'Unexpected error';

        }

        this.loading = false;
        this.cdr.detectChanges();
      },

      complete: () => {
        this.loading = false;
      }
    });
  }
}