import { Component } from '@angular/core';
import { DataTablesModule } from 'angular-datatables';
import { ApiService } from '../../../../services/api.service';
import { Location } from '@angular/common';
import { MessageService } from '../../../../services/message.service';


@Component({
  templateUrl: 'atividade-list.component.html'
})
export class AtividadeListComponent {

  dtOptions: DataTables.Settings = {};

  atividades: Array<any> = [];

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

    this.getAtividades();
  }

  protected getAtividades(){
    this.apiService.get('atividade').subscribe(
      res => {
        console.log(res);
        this.atividades = res;
      }
    )
  }



  deleteResource(resource) {
    this.messageService
      .confirm('Deseja realmente excluir este item?', 'Exclusão processada com sucesso', 'warning')
      .then((result) => {
        if (result.value) {
          
          this.apiService.delete('usuario/' + resource.id).subscribe(
            () => {
              this.messageService.successMessage('Sucesso', 'Exclusão processada com sucesso');
              this.atividades = this.atividades.filter(element => element != resource);
              console.log(this.atividades);
            }, (fail) => {
              
              this.messageService.errorMessage('AVISO!', 'Não foi possível realizar exclusão.');
            }
          );
        }
      });
  }

}
