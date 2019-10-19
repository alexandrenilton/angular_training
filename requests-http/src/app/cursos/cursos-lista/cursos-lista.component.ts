import { Cursos2Service } from './../cursos2.service';
import { AlertModalService } from './../../shared/alert-modal.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Curso } from '../curso';
import { Observable, empty, Subject, EMPTY } from 'rxjs';
import { catchError, take, switchMap } from 'rxjs/operators';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

import { CursosService } from './../cursos.service';
import { AlertModalComponent } from 'src/app/shared/alert-modal/alert-modal.component';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-cursos-lista',
  templateUrl: './cursos-lista.component.html',
  styleUrls: ['./cursos-lista.component.scss'],
  preserveWhitespaces: true
})
export class CursosListaComponent implements OnInit {
  // bsModalRef: BsModalRef;

  // cursos: Curso[];

  deleteModalRef: BsModalRef;
  @ViewChild('deleteModal', { static: true }) deleteModal; // refere-sse a um component do html.. do ng-template

  cursos$: Observable<Curso[]>;
  error$ = new Subject<boolean>();

  cursoSelected: Curso; // curso selecionado para deletar..

  constructor(
    private service: Cursos2Service,
    private modalService: BsModalService,
    private alertService: AlertModalService,
    private router: Router, // para atualizar e excluir..
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    // this.service.list()
    //   .subscribe(dados => this.cursos = dados);
    // this.cursos$ = this.service.list() // pega a lista de cursos.
    //   .pipe(
    //     catchError(error => {
    //       console.error(error);
    //       this.error$.next(true); // emitindo valor de true no subject
    //       return empty();
    //     })
    //   );
    this.onRefresh();
  }

  onRefresh() {
    console.log('onRefresh()');
    this.cursos$ = this.service
      .list() // pega a lista de cursos.
      .pipe(
        catchError(error => {
          console.error(error);
          //this.error$.next(true); // emitindo valor de true no subject
          this.handleError();
          return empty();
        })
      );

    this.service
      .list()
      // .pipe(
      //   catchError(error => empty())
      // )
      .subscribe(
        dados => console.log(dados) // 1 caso, sucesso!
        // error => console.error(error), // 2 eh sempre error
        // () => console.log('Observable completo!') // 3, completo, Observable está completo
      );
  }

  handleError() {
    // this.bsModalRef = this.modalService.show(AlertModalComponent);
    // // atraves da referencia, é possivel passar as InputProperties (@Input())
    // this.bsModalRef.content.type = 'danger';
    // // Adicionando msg..
    // this.bsModalRef.content.message = 'Erro ao carregar cursos, tente mais tarde!';
    this.alertService.showAlertDanger(
      'Erro ao carregar cursos, tente mais tarde!'
    );
  }

  onEdit(id: number) {
    this.router.navigate(['editar', id], { relativeTo: this.route });
  }

  onDelete(curso: Curso) {
    this.cursoSelected = curso;
    // https://valor-software.com/ngx-bootstrap/#/modals
    // this.deleteModalRef = this.modalService.show(this.deleteModal, { class: 'modal-sm' });
    const result$ = this.alertService.showConfirm(
      'Confirmação',
      'Tem certeza que deseja excluir esse curso?'
    );

    result$
      .asObservable()
      .pipe(
        take(1),
        switchMap(result => (result ? this.service.remove(curso) : EMPTY))
      )
      .subscribe(
        success => this.onRefresh(),
        error =>
          this.alertService.showAlertDanger(
            'Erro inesperado ao remover curso, tente novamente mais tarde!'
          )
      );
  }

  onConfirmDelete() {
    this.service.remove(this.cursoSelected).subscribe(
      // atualiza a tela
      success => this.onRefresh(),
      error =>
        this.alertService.showAlertDanger(
          'Erro inesperado ao remover curso, tente novamente mais tarde!'
        )
    );

    // ao fim. esconde o modal
    this.deleteModalRef.hide();
  }

  onDeclineDelete() {
    this.deleteModalRef.hide();
  }
}
