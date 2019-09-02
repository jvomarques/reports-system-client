import { ApiService } from '../../../../services/api.service';
import { Component, Injectable } from '@angular/core';
import Swal from 'sweetalert2'

@Component({
  templateUrl: 'usuario-form.component.html'
})

@Injectable() 
export class UsuarioFormComponent {

  constructor(
    private service: ApiService
  ) { }

  salvar():void{
    this.service.get('api/atividade').subscribe(
      (res) => {
        console.log(res);
    }
   );

    console.log("oi");
    Swal.fire("Hellow World");
  }
}
