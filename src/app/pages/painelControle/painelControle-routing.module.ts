import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UsuarioListComponent } from './usuario/usuario-list/usuario-list.component';
import { UsuarioFormComponent } from './usuario/usuario-form/usuario-form.component';
import { PerfilListComponent } from './perfil/perfil-list/perfil-list.component';
import { PerfilFormComponent } from './perfil/perfil-form/perfil-form.component';
import { LogListComponent } from './log/log-list/log-list.component';
import { AtividadeListComponent } from './atividade/atividade-list/atividade-list.component';
import { AtividadeFormComponent } from './atividade/atividade-form/atividade-form.component';



const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Painel de Controle'
    },
    children: [
      {
        path: '',
        redirectTo: 'usuario'
      },
      {
        path: 'usuario',
        children: [
          { path: "", component: UsuarioListComponent, data: { title: 'Usuário'} },
          { path: "new", component: UsuarioFormComponent, data: { title: 'Usuário'} },
          { path: ":id/edit", component: UsuarioFormComponent, data: { title: 'Usuário'} }
        ]
      },
      {
        path: 'perfil',
        children: [
          { path: "", component: PerfilListComponent, data: { title: 'Perfil'} },
          { path: "new", component: PerfilFormComponent, data: { title: 'Perfil'} },
          { path: ":id/edit", component: PerfilFormComponent, data: { title: 'Perfil'} }
        ]
      },
      {
        path: 'atividade',
        children: [
          { path: "", component: AtividadeListComponent, data: { title: 'Atividade'} },
          { path: "new", component: AtividadeFormComponent, data: { title: 'Atividade'} },
          { path: ":id/edit", component: AtividadeFormComponent, data: { title: 'Atividade'} }
        ]
      },
      {
        path: 'log',
        children: [
          { path: "", component: LogListComponent, data: { title: 'Log'} },
        ]
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PainelControleRoutingModule {}
