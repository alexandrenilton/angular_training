import { AlertModalService } from './../../shared/alert-modal.service';
import { Component, OnInit } from '@angular/core';
import { Curso } from '../curso';
import { Observable, empty, Subject } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

import { CursosService } from './../cursos.service';
import { AlertModalComponent } from 'src/app/shared/alert-modal/alert-modal.component';

@Component({
  selector: 'app-cursos-lista',
  templateUrl: './cursos-lista.component.html',
  styleUrls: ['./cursos-lista.component.scss'],
  preserveWhitespaces: true
})
export class CursosListaComponent implements OnInit {

  // bsModalRef: BsModalRef;

  // cursos: Curso[];
  cursos$: Observable<Curso[]>;
  error$ = new Subject<boolean>();


  constructor(
    private service: CursosService,
    // private modalService: BsModalService
    private alertService: AlertModalService
  ) { }

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
    this.cursos$ = this.service.list() // pega a lista de cursos.
      .pipe(
        catchError(error => {
          console.error(error);
          //this.error$.next(true); // emitindo valor de true no subject
          this.handleError();
          return empty();
        })
      );

    this.service.list()
      // .pipe(
      //   catchError(error => empty())
      // )
      .subscribe(
        dados => console.log(dados), // 1 caso, sucesso!
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
    this.alertService.showAlertDanger('Erro ao carregar cursos, tente mais tarde!');
  }

}
