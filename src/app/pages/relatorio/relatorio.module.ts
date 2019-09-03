import { RelatorioListComponent } from './relatorio-list/relatorio-list.component';
import { RelatorioFormComponent } from './relatorio-form/relatorio-form.component';
import { RelatorioRoutingModule } from './relatorio-routing.module';
import { DataTablesModule } from 'angular-datatables';
// Angular
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { NgSelectModule } from '@ng-select/ng-select';


// Tabs Component
import { TabsModule } from 'ngx-bootstrap/tabs';

// Components Routing


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    NgSelectModule,
    ReactiveFormsModule,
    RelatorioRoutingModule,
    TabsModule,
    DataTablesModule,

  ],
  declarations: [
    RelatorioFormComponent,
    RelatorioListComponent
  ]
})
export class RelatorioModule { }
