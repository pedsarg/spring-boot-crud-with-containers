import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-Register',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, RouterLink],
  templateUrl: './register.html',
  styleUrls: ['./register.css']
})
export class RegisterComponent {
  RegisterForm: FormGroup;

constructor(private fb: FormBuilder, private router: Router) {
    this.RegisterForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(3)]],
      fullname: ['', [Validators.required, Validators.minLength(5)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  get username() { return this.RegisterForm.get('username'); }
  get fullname() { return this.RegisterForm.get('fullname'); }
  get email() { return this.RegisterForm.get('email'); }
  get password() { return this.RegisterForm.get('password'); }

  onSubmit() {
    if (this.RegisterForm.valid) {
      const dadosRegister = this.RegisterForm.value;
      const RegisterJson = JSON.stringify(dadosRegister, null, 2);

      console.log('JSON de Register gerado:', dadosRegister);
      alert(`Register solicitado!\n\n${RegisterJson}`);
      
      // Aqui no futuro você enviará esse JSON para a sua API criar o usuário

      this.router.navigate(['/login']);
    }
  }
}