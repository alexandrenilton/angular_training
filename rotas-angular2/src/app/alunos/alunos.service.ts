import { Aluno } from './aluno';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AlunosService {

  private alunos: Aluno[] = [
    { id: 1, nome: 'Aluno 01', email: 'aluno01@gmail.com' },
    { id: 2, nome: 'Aluno 02', email: 'aluno02@gmail.com' },
    { id: 3, nome: 'Aluno 03', email: 'aluno03@gmail.com' },
    { id: 4, nome: 'Aluno 04', email: 'aluno04@gmail.com' },
    { id: 5, nome: 'Aluno 05', email: 'aluno05@gmail.com' },
    { id: 6, nome: 'Aluno 06', email: 'aluno06@gmail.com' },
    { id: 7, nome: 'Aluno 07', email: 'aluno07@gmail.com' },
    { id: 8, nome: 'Aluno 08', email: 'aluno08@gmail.com' },
    { id: 9, nome: 'Aluno 09', email: 'aluno09@gmail.com' },
    { id: 10, nome: 'Aluno 10', email: 'aluno10@gmail.com' },
  ];


  getAlunos() {
    return this.alunos;
  }


  getAluno(id: number) {
    for (let i = 0; i < this.alunos.length; i++) {
      let aluno = this.alunos[i];
      if (aluno.id == id) {
        return aluno;
      }
    }
    return null;
  }


  constructor() { }
}
