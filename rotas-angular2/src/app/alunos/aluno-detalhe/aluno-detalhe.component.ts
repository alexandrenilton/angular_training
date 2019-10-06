import { Aluno } from './../aluno';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';

import { AlunosService } from '../alunos.service';

@Component({
  selector: 'app-aluno-detalhe',
  templateUrl: './aluno-detalhe.component.html',
  styleUrls: ['./aluno-detalhe.component.css']
})
export class AlunoDetalheComponent implements OnInit, OnDestroy {

  aluno: any;
  inscricao: Subscription;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private alunosService: AlunosService
  ) { }

  editarContato(): void {
    this.router.navigate(['/alunos', this.aluno.id, 'editar']); // navegando para rota /aluno/:id/editar
  }

  ngOnInit() {

    console.log('ngOnInit: AlunoDetalheComponent');
    /*
    this.inscricao = this.route.params.subscribe(
      (params: any) => {
        let id = params['id'];
     this.aluno = this.alunosService.getAluno(id);
      });
    */

    // Usando resolver:
    this.inscricao = this.route.data.subscribe(
      // TS que mostra que dentro de 'info' tem o obj 'aluno' do tipo 'Aluno'
      (info: { aluno: Aluno }) => {
        console.log('Recebendo o obj Aluno do resolver');
        this.aluno = info.aluno;
      }
    );

  }

  ngOnDestroy() {
    this.inscricao.unsubscribe();
  }

}
