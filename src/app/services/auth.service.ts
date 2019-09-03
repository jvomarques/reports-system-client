import { MessageService } from './message.service';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { ApiService } from './api.service';

import * as jwt_decode from 'jwt-decode';
import * as moment from 'moment';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private apiService: ApiService,
    private router: Router,
    private messageService: MessageService,
  ) { }

  login(login:string, senha:string){
    this.apiService.post('login', {login: login, senha: senha}).subscribe(
      authResult => {
        console.log(authResult);

        if(authResult.authenticated){
          this.setSession(authResult);
          this.router.navigate(['dashboard']);
        }
        else if(!authResult.authenticated){
          this.messageService.errorMessage("Atenção", authResult.message);
        }
      }
    )
  }

  private setSession(authResult) {
    const token = authResult.accessToken;
    const tokenExpiration = authResult.expiration;
    let user = JSON.stringify(authResult.user);
    const perfil = authResult.perfil;
    
    console.log(user);
    
    localStorage.setItem('token', token);
    localStorage.setItem('tokenExpiration', tokenExpiration);
    // localStorage.setItem('nomeUsuario', JSON.parse(user.nome));
    localStorage.setItem('usuario', user);
    localStorage.setItem('perfil', authResult.perfil);
  }

  usuarioEstaAutenticado(tokenExpiration?: string):boolean{
    
    let tokenExpirationDate = new Date(tokenExpiration);
    const now = new Date();
    if(new Date(tokenExpiration) >= now)
      return true;

    return false;
  }

  usuarioEhAdmin():boolean{
    let perfis = localStorage.getItem('perfil');

    // perfis.forEach(perfil => {
    //   if(perfil == "Administrator")
    //     return true;
    // });

    return true;  
  }

  // getTokenExpirationDate(token: string): Date {
  //   const decoded = jwt_decode(token);

  //   if (decoded.exp === undefined) return null;

  //   const date = new Date(0); 
  //   date.setUTCSeconds(decoded.exp);
  //   return date;
  // }

  // isTokenExpired(token?: string): boolean {
  //   if(!token) token = this.getToken();
  //   if(!token) return true;

  //   const date = this.getTokenExpirationDate(token);
  //   if(date === undefined) return false;
  //   return !(date.valueOf() > new Date().valueOf());
  // }

  // getToken(): string {
  //   return localStorage.getItem('token');
  // }

  // setToken(token: string): void {
  //   localStorage.setItem('token', token);
  // }
}
