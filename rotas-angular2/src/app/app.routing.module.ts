import { PaginaNaoEncontradaComponent } from './pagina-nao-encontrada/pagina-nao-encontrada.component';
import { AlunosGuard } from './guards/alunos.guard';
import { AuthGuard } from './guards/auth.guard';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { CursosGuard } from './guards/cursos.guard';

const appRoutes: Routes = [
  {
    path: 'cursos',
    /* carregamento lazy load.. sรณ vai carregar qd for chamado /cursos, precisa do hash #CursosModule */
    loadChildren: './cursos/cursos.module#CursosModule',
    canActivate: [AuthGuard], // verifica a rotaa base, ou seja, '/cursos/
    canActivateChild: [CursosGuard], // verifica as rotas filhas de '/cursos'
    canLoad: [AuthGuard]
  },
  {
    path: 'alunos',
    loadChildren: './alunos/alunos.module#AlunosModule',
    canActivate: [AuthGuard], // verifica a rota base, ou seja: /alunos
    // jogando para alunos.routing.module a guarda de rotas dos children
    // com isso, só vai carregar as rotas se entrar em um dos subs paths de /alunos.L0
    // isso é bom, para separar a guarda de rotas por modulos/funcionalidades
    // para isso.. comentei abaixo:
    // canActivateChild: [AlunosGuard] // verifica as rotas filhas de '/alunos'
    canLoad: [AuthGuard]
  },
  { path: 'login', component: LoginComponent },
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: '**', component: PaginaNaoEncontradaComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
