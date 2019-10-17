import { AlertModalService } from './../../shared/alert-modal.service';
import { CursosService } from './../cursos.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { map, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-cursos-form',
  templateUrl: './cursos-form.component.html',
  styleUrls: ['./cursos-form.component.scss']
})
export class CursosFormComponent implements OnInit {
  form: FormGroup;
  submitted = false; // pra saber se o form foi submetido ou não

  constructor(
    private fb: FormBuilder,
    private service: CursosService,
    private modal: AlertModalService,
    private location: Location,
    private route: ActivatedRoute // classe que contem os parametros da rota..
  ) {}

  ngOnInit() {
    // edit: 1º Pegar o id de /editar/ID
    // this.route.params.subscribe((params: any) => {
    //   const id = params['id'];
    //   console.log(id);
    //   const curso$ = this.service.loadById(id);
    //   curso$.subscribe(curso => {
    //     this.updateForm(curso);
    //   });
    // });
    // refactoring do codigo acima..
    this.route.params
      .pipe(
        map((params: any) => params['id']),
        switchMap(id => this.service.loadById(id))
      )
      .subscribe(curso => {
        this.updateForm(curso);
      });
    // concatMap -> ordem da requisição importa
    // mergeMap -> ordem da requisição não importa
    // exhaustMap -> faz a requisição do pedido e espera terminar ate fazer o outro. Usados em Login

    this.form = this.fb.group({
      id: [null],
      nome: [
        null,
        [Validators.required, Validators.minLength(3), Validators.maxLength(20)]
      ]
    });
  }

  updateForm(curso) {
    this.form.patchValue({
      nome: curso.nome,
      id: curso.id
    });
  }

  hasError(testField: string) {
    return this.form.get(testField).errors;
  }

  onSubmit() {
    this.submitted = true;
    console.log(this.form.value);
    if (this.form.valid) {
      console.log('submit');
      // chamada ao serviço
      this.service.create(this.form.value).subscribe(
        success => {
          console.log('sucesso');
          this.modal.showAlertSuccess('Curso gravado com sucesso!');
          this.location.back(); // mesma coisa de clicar no botao de voltar do browser
        },
        failure => {
          console.error(failure);
          this.modal.showAlertDanger(
            'Erro ao tentar gravar novo curso na base de dados'
          );
        },
        () => console.log('Request completed!')
      );
    }
  }

  onCancel() {
    this.submitted = false;
    this.form.reset(); // resetar td
    console.log('cancel()');
  }
}
