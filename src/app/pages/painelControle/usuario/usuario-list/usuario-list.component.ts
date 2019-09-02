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

  protected getUsuarios(){
    this.apiService.get('usuario').subscribe(
      res => {
        console.log(res);
        this.usuarios = res;
      }
    )
  }

  // protected deleteResource(res){

  //   this.apiService.delete('usuario/'+res.id).subscribe(
  //     res => {
  //       console.log(res);
  //       location.reload()
  //     },
  //     error => {
  //       console.log(error);
  //     }
  //   );
  // }


  deleteResource(resource) {
    this.messageService
      .confirm('Deseja realmente excluir este item?', 'Solicitação processada com sucesso', 'warning')
      .then((result) => {
        if (result.value) {
          // const firstObject = Object.keys(resource)[0];
          this.apiService.delete('usuario/' + resource.id).subscribe(
            () => {
              this.messageService.successMessage('Sucesso', 'Solicitação processada com sucesso');
              this.usuarios = this.usuarios.filter(element => element != resource);
              console.log(this.usuarios);
            }, (fail) => {
              const mensagem = fail.error.Mensagem || fail.error.mensagem || 'Error no serviço! Entre em contato com a informática.';
              this.messageService.customMessage('AVISO!', mensagem, 'warning');
            }
          );
        }
      });
  }

}
