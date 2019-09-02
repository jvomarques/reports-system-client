import { Injectable } from '@angular/core';
import { ApiService } from './api.service';

import * as jwtDecode from 'jwt-decode';
import * as moment from 'moment';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private apiService: ApiService
  ) { }

  login(login:string, senha:string){
    this.apiService.post('login', {login: login, senha: senha}).subscribe(
      authResult => {
        console.log(authResult);
        this.setSession(authResult);
      },
      error => {
        console.error(error);
      }
    )
  }

  private setSession(authResult) {
    const token = authResult.token;
    const user_id = authResult.user_id;
    const perfil = authResult.perfil;

    localStorage.setItem('token', authResult.token);
    localStorage.setItem('user', authResult.user);
    localStorage.setItem('perfil', authResult.perfil);
  }

  usuarioEstaAutenticado():boolean{
    return true;
  }

  usuarioEhAdmin():boolean{
    return true;  
  }
}
