import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface LoginDTO {
  username: string;
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

  private apiUrl = 'http://localhost:8080/auth/login';

  login(data: LoginDTO): Observable<WitcherResponseDTO> {

    return this.http.post<WitcherResponseDTO>(
      this.apiUrl,
      data
    );
  }
}

