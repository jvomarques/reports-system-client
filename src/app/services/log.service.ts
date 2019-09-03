import { Injectable } from '@angular/core';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class LogService {

  constructor(private apiService: ApiService) { }

  registrarLog(acao: any){
    let usuario = JSON.parse(localStorage.getItem('usuario'));
    this.apiService.post('log',{acao: acao, data: new Date(), usuario: usuario}).subscribe(
      res => {
        console.log(res);
      },
      error => {
        console.log(error);
      }
    )
  }
}
