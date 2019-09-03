import { RelatorioListComponent } from './relatorio-list/relatorio-list.component';
import { RelatorioFormComponent } from './relatorio-form/relatorio-form.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';



const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Painel de Controle'
    },
    children: [
      {
        path: '',
        redirectTo: 'relatorio'
      },
      {
        path: 'relatorio',
        children: [
          { path: "", component: RelatorioListComponent, data: { title: 'Relatório'} },
          { path: "new", component: RelatorioFormComponent, data: { title: 'Relatório'} },
          { path: ":id/edit", component: RelatorioFormComponent, data: { title: 'Relatório'} }

        ]
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RelatorioRoutingModule {}
