import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UsuarioListComponent } from './usuario/usuario-list/usuario-list.component';



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
        component: UsuarioListComponent,
        data: {
          title: 'Usuário'
        }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PainelControleRoutingModule {}
