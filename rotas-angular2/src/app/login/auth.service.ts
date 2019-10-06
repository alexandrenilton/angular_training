import { Router } from '@angular/router';
import { Injectable, EventEmitter } from '@angular/core';
import { Usuario } from './usuario';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private usuarioAutenticado: boolean = false;

  mostrarMenuEmitter = new EventEmitter<boolean>();

  constructor(
    private router: Router
  ) { }

  fazerLogin(usuario: Usuario) {
    this.usuarioAutenticado = true;
    this.router.navigate(['/']); // homepage
    this.mostrarMenuEmitter.emit(true);
    // senao login..
    // this.mostrarMenuEmitter.emit(false);
  }


  usuarioEstaAutenticado() {
    return this.usuarioAutenticado;
  }
}
