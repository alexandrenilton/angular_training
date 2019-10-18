import { CursosService } from './../cursos.service';
import { Curso } from './../curso';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  Resolve
} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class CursoResolverGuard implements Resolve<Curso> {
  constructor(private service: CursosService) {}
  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Curso | Observable<Curso> | Promise<Curso> {
    //se tive o id, éh pq está editando
    if (route.params && route.params['id']) {
      return this.service.loadById(route.params['id']);
    }

    // se nao tiver id, eh um objeto novo
    // operador of, retorna um observador a partir de um objeto
    return of({
      id: null,
      nome: null
    });
  }
}
