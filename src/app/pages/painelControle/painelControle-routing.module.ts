import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UsuarioListComponent } from './usuario/usuario-list/usuario-list.component';
import { UsuarioFormComponent } from './usuario/usuario-form/usuario-form.component';
import { PerfilListComponent } from './perfil/perfil-list/perfil-list.component';
import { PerfilFormComponent } from './perfil/perfil-form/perfil-form.component';



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
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PainelControleRoutingModule {}
