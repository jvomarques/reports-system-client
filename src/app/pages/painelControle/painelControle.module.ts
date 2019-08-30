// Angular
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';


// Tabs Component
import { TabsModule } from 'ngx-bootstrap/tabs';

// Components Routing
import { PainelControleRoutingModule } from './painelControle-routing.module';
import { UsuarioListComponent } from './usuario/usuario-list/usuario-list.component';
import { DataTablesModule } from 'angular-datatables';
import { UsuarioFormComponent } from './usuario/usuario-form/usuario-form.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    PainelControleRoutingModule,

    TabsModule,
    DataTablesModule,


  ],
  declarations: [
    UsuarioListComponent,
    UsuarioFormComponent,

  ]
})
export class PainelControleModule { }
