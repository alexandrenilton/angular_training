import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CursosService {

  getCursos() {
    return [
      { id: 1, nome: 'Angular 2' },
      { id: 2, nome: 'ReactJS' },
      { id: 3, nome: 'Front - VueJS' },
      { id: 4, nome: 'Back - NodeJS' },
      { id: 5, nome: 'Back - Java' },
      { id: 6, nome: 'Front - Thymeleaf' },
      { id: 7, nome: 'Front - Primefaces' },
      { id: 8, nome: 'Back - SpringBoot' }
    ];
  }

  getCurso(id: number) {
    let cursos = this.getCursos();
    for (let i = 0; i < cursos.length; i++) {
      let curso = cursos[i];
      if (curso.id == id) {
        return curso;
      }
    }
    return null;
  }

  constructor() { }
}
