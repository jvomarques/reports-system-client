import { Component } from '@angular/core';
import { DataTablesModule } from 'angular-datatables';
import { ApiService } from '../../../../services/api.service';
import { Location } from '@angular/common';
import { MessageService } from '../../../../services/message.service';


@Component({
  templateUrl: 'usuario-list.component.html'
})
export class UsuarioListComponent {
  dtOptions: DataTables.Settings = {};

  usuarios: Array<any> = [];

  messageService: MessageService = new MessageService();

  constructor(
    private apiService: ApiService,
    private location: Location
  ) { }

  ngOnInit(){
    this.registrarLog('usuario-list', 'list');

    this.dtOptions = {
      responsive: true,
      stateSave: true,
      language: {
        search: 'Procurar:',
        url: 'https://cdn.datatables.net/plug-ins/1.10.19/i18n/Portuguese-Brasil.json'
      },
      columnDefs: [ {
        targets: [3], /* column index */
        orderable: false, /* true or false */
        width:"10%",
     }],

      
    };

    this.getUsuarios();
  }

  registrarLog(paginaAcessada: any, acao: any){

    let usuario = JSON.parse(localStorage.getItem('usuario'));
    let now = new Date();

    let body = {
      acao: acao, 
      paginaAcessada: paginaAcessada,
      data: now, 
      idUsuario: usuario.id
    }
    console.log(body);
    this.apiService.post('log', body).subscribe(
      res => {
        console.log(res);
      },
      error => {
        console.log(error);
      }
    )
  }

  protected getUsuarios(){
    this.apiService.get('usuario').subscribe(
      res => {
        console.log(res);
        this.usuarios = res;
      }
    )
  }


  deleteResource(resource) {
    this.messageService
      .confirm('Deseja realmente excluir este item?', 'Exclusão realizada com sucesso', 'warning')
      .then((result) => {
        if (result.value) {
          // const firstObject = Object.keys(resource)[0];
          this.apiService.delete('usuario/' + resource.id).subscribe(
            () => {
              this.messageService.successMessage('Sucesso', 'Exclusão realizada com sucesso');
              this.usuarios = this.usuarios.filter(element => element != resource);
              this.registrarLog('usuario-list', 'delete');

              console.log(this.usuarios);
            }, (fail) => {
              this.messageService.errorMessage('AVISO!', 'Não foi possível realizar exclusão.');
            }
          );
        }
      });
  }

}
