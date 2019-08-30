import { Component } from '@angular/core';
import { DataTablesModule } from 'angular-datatables';

@Component({
  templateUrl: 'usuario-list.component.html'
})
export class UsuarioListComponent {
  dtOptions: DataTables.Settings = {};

  constructor() { }

  ngOnInit(){

    this.dtOptions = {
      responsive: true,
      stateSave: true,
      language: {
        search: 'Procurar:',
        url: 'https://cdn.datatables.net/plug-ins/1.10.19/i18n/Portuguese-Brasil.json'
      }
      
    };

  }

}
