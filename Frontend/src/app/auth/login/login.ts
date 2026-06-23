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
import { finalize } from 'rxjs';

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

    this.authService.login(this.loginForm.value)

      .pipe(
        finalize(() => {
          this.loading = false;
        })
      )

      .subscribe({

        next: (response) => {

          if (response.token) {

            localStorage.setItem('token', response.token);
          }

          this.router.navigate(['/home']);
        },

        error: (err) => {

          console.error('Erro no login:', err);

          if (err.status === 401) {

            this.errorMessage =
              err.error?.message?.trim() ||
              'Invalid username or password';

          } else if (err.status === 0) {

            this.errorMessage = 'Unable to connect to server';

          } else {

            this.errorMessage = 'Unexpected error';
          }

          this.cdr.markForCheck();
        }
      });
  }
}