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
import { AtividadeRelatorioListComponent } from './atividadeRelatorio-list/atividadeRelatorio-list.component';

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
    AtividadeRelatorioListComponent,
    RelatorioFormComponent
  ]
})
export class RelatorioModule { }
