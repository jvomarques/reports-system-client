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
    private moment: moment.Moment
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

          // console.error(error);
        }
      }
    )
  }

  private setSession(authResult) {
    const token = authResult.accessToken;
    const tokenExpiration = authResult.expiration;
    const user = authResult.user;
    const perfil = authResult.perfil;

    localStorage.setItem('token', token);
    localStorage.setItem('tokenExpiration', tokenExpiration);
    localStorage.setItem('user', user);
    localStorage.setItem('perfil', authResult.perfil);
  }

  usuarioEstaAutenticado(tokenExpiration?: string):boolean{
    // const date = this.getTokenExpirationDate(tokenExpiration);
    
    // const tokenExpirationDate = new Date(tokenExpiration);
    // console.log(tokenExpirationDate);

    // if(tokenExpirationDate === undefined) return false;
    // return !(tokenExpirationDate.valueOf() > new Date().valueOf());
    return true;
  }

  usuarioEhAdmin():boolean{
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
