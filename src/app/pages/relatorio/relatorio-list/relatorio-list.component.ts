import { Component } from '@angular/core';
import { DataTablesModule } from 'angular-datatables';
import { ApiService } from '../../../services/api.service';
import { Location } from '@angular/common';
import { MessageService } from '../../../services/message.service';


@Component({
  templateUrl: 'relatorio-list.component.html'
})
export class RelatorioListComponent {

  dtOptions: DataTables.Settings = {};

  relatorios: Array<any> = [];

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

    this.getRelatorios();
  }

  protected getRelatorios(){
    this.apiService.get('relatorio').subscribe(
      res => {
        console.log(res);
        this.relatorios = res;
      }
    )
  }



  deleteResource(resource) {
    this.messageService
      .confirm('Deseja realmente excluir este item?', 'Exclusão processada com sucesso', 'warning')
      .then((result) => {
        if (result.value) {
          
          this.apiService.delete('relatorio/' + resource.id).subscribe(
            () => {
              this.messageService.successMessage('Sucesso', 'Exclusão processada com sucesso');
              this.relatorios = this.relatorios.filter(element => element != resource);
              console.log(this.relatorios);
            }, (fail) => {
              
              this.messageService.errorMessage('AVISO!', 'Não foi possível realizar exclusão.');
            }
          );
        }
      });
  }

}
