import { Component, ChangeDetectorRef } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule
} from '@angular/forms';

import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';

import { finalize } from 'rxjs';

import { AuthService } from '../services/authService.js';

@Component({
  selector: 'app-Register',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, RouterLink],
  templateUrl: './register.html',
  styleUrls: ['./register.css']
})
export class RegisterComponent {

  RegisterForm: FormGroup;

  errorMessage: string = '';

  loading = false;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private cdr: ChangeDetectorRef
  ) {

    this.RegisterForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(3)]],
      fullname: ['', [Validators.required, Validators.minLength(5)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  get username() {
    return this.RegisterForm.get('username');
  }

  get fullname() {
    return this.RegisterForm.get('fullname');
  }

  get email() {
    return this.RegisterForm.get('email');
  }

  get password() {
    return this.RegisterForm.get('password');
  }

  onSubmit() {

    this.errorMessage = '';

    if (this.RegisterForm.invalid) {
      return;
    }

    const dadosRegister = this.RegisterForm.value;

    this.loading = true;

    this.authService.register(dadosRegister)

      .pipe(
        finalize(() => {
          this.loading = false;
        })
      )

      .subscribe({

        next: (response) => {

          console.log('Usuário registrado:', response);

          this.RegisterForm.reset();

          this.router.navigate(['/home']);
        },

        error: (error) => {

          console.error('Erro ao registrar:', error);

          if (error.status === 409) {

            this.errorMessage =
              error.error?.message ||
              'Username already exists!';

          } else if (error.status === 400) {

            this.errorMessage = 'Invalid registration data.';

          } else if (error.status === 0) {

            this.errorMessage = 'Server unavailable.';

          } else {

            this.errorMessage = 'Unexpected error while registering.';
          }

          this.cdr.markForCheck();
        }
    });
  }
}