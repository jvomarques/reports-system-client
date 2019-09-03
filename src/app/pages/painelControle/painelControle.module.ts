// Angular
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { NgSelectModule } from '@ng-select/ng-select';


// Tabs Component
import { TabsModule } from 'ngx-bootstrap/tabs';

// Components Routing
import { PainelControleRoutingModule } from './painelControle-routing.module';
import { UsuarioListComponent } from './usuario/usuario-list/usuario-list.component';
import { DataTablesModule } from 'angular-datatables';
import { UsuarioFormComponent } from './usuario/usuario-form/usuario-form.component';
import { PerfilListComponent } from './perfil/perfil-list/perfil-list.component';
import { PerfilFormComponent } from './perfil/perfil-form/perfil-form.component';
import { LogListComponent } from './log/log-list/log-list.component';
import { AtividadeListComponent } from './atividade/atividade-list/atividade-list.component';
import { AtividadeFormComponent } from './atividade/atividade-form/atividade-form.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    NgSelectModule,
    ReactiveFormsModule,
    PainelControleRoutingModule,
    TabsModule,
    DataTablesModule,

  ],
  declarations: [
    UsuarioListComponent,
    UsuarioFormComponent,
    PerfilListComponent,
    PerfilFormComponent,
    LogListComponent,
    AtividadeListComponent,
    AtividadeFormComponent
  ]
})
export class PainelControleModule { }
