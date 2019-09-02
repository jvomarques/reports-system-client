import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  usuarioEstaAutenticado():boolean{
    return true;
  }

  usuarioEhAdmin():boolean{
    return true;  
  }
}
