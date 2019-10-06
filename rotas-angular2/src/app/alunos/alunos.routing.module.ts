import { AlunoDetalheResolver } from './guards/aluno-detalhe.resolver';
import { AlunosDeactivateGuard } from './../guards/alunos-deactivate.guard';
import { CanDeactivate } from '@angular/router/src/utils/preactivation';
import { AlunosGuard } from './../guards/alunos.guard';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AlunosComponent } from './alunos.component';
import { AlunoFormComponent } from './aluno-form/aluno-form.component';
import { AlunoDetalheComponent } from './aluno-detalhe/aluno-detalhe.component';

const alunosRoutes = [
  {
    path: '', component: AlunosComponent,
    canActivateChild: [AlunosGuard],
    children: [
      { path: 'novo', component: AlunoFormComponent },
      {
        path: ':id', component: AlunoDetalheComponent,
        resolve: { aluno: AlunoDetalheResolver }
      },
      {
        path: ':id/editar', component: AlunoFormComponent,
        canDeactivate: [AlunosDeactivateGuard]
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(alunosRoutes)],
  exports: [RouterModule],
})
export class AlunosRoutingModule { }
