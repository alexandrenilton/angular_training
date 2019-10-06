import { IFormCanDeactivate } from './iform-candeactivate';
import { Observable } from 'rxjs/Rx';
import { ActivatedRouteSnapshot, RouterStateSnapshot, CanDeactivate } from '@angular/router';
import { Injectable } from '@angular/core';
import { AlunoFormComponent } from './../alunos/aluno-form/aluno-form.component';

// Guarda de rotas CanDeactivate usado para qd sair do formulario em meio a edição
// ele verifica se a rota pode ser desativada ou nao
@Injectable()
export class AlunosDeactivateGuard implements CanDeactivate<IFormCanDeactivate> {

  canDeactivate(
    component: IFormCanDeactivate,
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {

    console.log('guarda de desativação');

    //return component.podeMudarRota ? component.podeMudarRota() : true;

    return component.podeDesativar ? component.podeDesativar() : true;
  }
}
