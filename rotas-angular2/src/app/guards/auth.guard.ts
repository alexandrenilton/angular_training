import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, Router, CanActivate, Route, CanLoad } from '@angular/router';

import { AuthService } from '../login/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanLoad {

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  canActivate(
    router: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | boolean {


    return this.verificarAcesso();

  }

  private verificarAcesso(): boolean {

    if (this.authService.usuarioEstaAutenticado()) {
      return true;
    }
    // usuário nao está autenticado ainda.. mostra a pagina de login
    console.log('redirecionando para a rota de login..');
    this.router.navigate(['/login']);
    return false;
  }

  canLoad(route: Route): Observable<boolean> | Promise<boolean> | boolean {
    console.log('canLoad: verificando se usuário pode carregar o cod módulo');
    return this.verificarAcesso();
  }

}


