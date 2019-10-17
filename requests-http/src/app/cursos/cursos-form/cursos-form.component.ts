import { AlertModalService } from './../../shared/alert-modal.service';
import { CursosService } from './../cursos.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Location } from '@angular/common';

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
    private location: Location
  ) {}

  ngOnInit() {
    this.form = this.fb.group({
      nome: [
        null,
        [Validators.required, Validators.minLength(3), Validators.maxLength(20)]
      ]
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
