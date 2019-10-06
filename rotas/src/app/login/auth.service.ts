import { Router } from '@angular/router';
import { Injectable, EventEmitter } from '@angular/core';

import { Usuario } from './usuario';


@Injectable()
export class AuthService {

  private usuarioAutenticado: boolean = false;

  // emissor de eventos, para passar ao app component se tem que mostrar ou não o menu principal
  mostrarMenuEmitter = new EventEmitter<boolean>();

  constructor(private router: Router) { }

  fazerLogin(usuario: Usuario) {
    if (usuario.nome === 'usuario@email.com' &&
      usuario.senha === '123456') {
      this.usuarioAutenticado = true;

      // mostrar o menu: SIM
      this.mostrarMenuEmitter.emit(true);
      this.router.navigate(['/']);
    } else {
      this.usuarioAutenticado = false;

      // mostrar o menu, não!
      this.mostrarMenuEmitter.emit(false);
    }
  }

  usuarioEstaAutenticado() {
    return this.usuarioAutenticado;
  }

}
