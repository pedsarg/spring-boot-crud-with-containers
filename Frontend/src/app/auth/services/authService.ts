import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface LoginDTO {
  username: string;
  password: string;
}

export interface RegisterDTO {
  username: string;
  fullname: string;
  email: string;
  password: string;
}

export interface WitcherResponseDTO {
  message: string;
  token: string;
  data?: any;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private http = inject(HttpClient);

  private loginUrl = 'http://localhost:8080/auth/login';
  private registerUrl = 'http://localhost:8080/auth/register';

  login(data: LoginDTO): Observable<WitcherResponseDTO> {

    return this.http.post<WitcherResponseDTO>(
      this.loginUrl,
      data
    );
  }

  register(data: RegisterDTO): Observable<WitcherResponseDTO> {

    return this.http.post<WitcherResponseDTO>(
      this.registerUrl,
      data
    );
  }
}