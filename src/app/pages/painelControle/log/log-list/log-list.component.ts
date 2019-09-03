import { Component } from '@angular/core';
import { DataTablesModule } from 'angular-datatables';
import { ApiService } from '../../../../services/api.service';
import { Location } from '@angular/common';
import { MessageService } from '../../../../services/message.service';


@Component({
  templateUrl: 'log-list.component.html'
})
export class LogListComponent {

  dtOptions: DataTables.Settings = {};

  logs: Array<any> = [];

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

    this.getLogs();
  }

  protected getLogs(){
    this.apiService.get('log').subscribe(
      res => {
        console.log(res);
        this.logs = res;
      }
    )
  }

}
