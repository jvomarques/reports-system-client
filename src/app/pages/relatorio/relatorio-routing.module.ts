import { RelatorioFormComponent } from './relatorio-form/relatorio-form.component';
import { AtividadeRelatorioListComponent } from './atividadeRelatorio-list/atividadeRelatorio-list.component';
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
        redirectTo: 'atividadesRelatorio'
      },
      {
        path: 'atividadesRelatorio',
        children: [
          { path: "", component: AtividadeRelatorioListComponent, data: { title: 'MinhasAtividades'} },
          { path: "new", component: RelatorioFormComponent, data: { title: 'Relatório'} },
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
