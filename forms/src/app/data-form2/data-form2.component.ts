import { ConsultaCepService } from './../shared/services/consulta-cep.service';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl, FormArray } from '@angular/forms';
import { EstadoBr } from './../shared/models/estado-br.model';
import { DropdownService } from './../shared/services/dropdown.service';
import { Observable, empty } from 'rxjs';
import { FormValidations } from '../shared/form-validations';
import { VerificaEmailService2 } from './services/verifica-email2.service';
import { map, filter, switchMap, distinctUntilChanged, tap } from 'rxjs/operators'
import { BaseFormComponent } from '../shared/base-form/base-form.component';
import { Cidade } from '../shared/models/cidade';

@Component({
  selector: 'app-data-form2',
  templateUrl: './data-form2.component.html',
  styleUrls: ['./data-form2.component.css']
})
export class DataForm2Component implements OnInit {

  formulario: FormGroup;
  // estados: EstadoBr[];
  estados: Observable<EstadoBr[]>; /** para evitar memory leak */
  cargos: any[];
  tecnologias: any[];
  newslettersOptions: any[];

  frameworks = ['Angular', 'React', 'Vue', 'Sencha', 'Primefaces'];

  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private cepService: ConsultaCepService,
    private verificaEmailService: VerificaEmailService2,
    private dropdownService: DropdownService
  ) { }

  ngOnInit() {
    /* Carregar <select> de estados */
    /* Sem observable e async : */
    /*this.dropdownService.getEstadosBr().subscribe(dados => {
      this.estados = dados;
    });
    */
    /* Com Observable e async */
    this.estados = this.dropdownService.getEstadosBr();
    /* pegando todos os cargos */
    this.cargos = this.dropdownService.getCargos();
    /* pegando todas as tecnologias */
    this.tecnologias = this.dropdownService.getTecnologias();
    /** carregando opcoes de newsletters */
    this.newslettersOptions = this.dropdownService.getNewsletter();

    this.formulario = this.formBuilder.group({
      nome: [null,
        /** adicionando validações no campo NOME */
        [Validators.required, Validators.minLength(3), Validators.maxLength(40)]
      ],
      email: [null,
        /** adicionando validações no campo EMAIL */
        [Validators.required, Validators.email], /* validações sincronas: usando mais de uma validação, colocar em [] */
        [this.validarEmail.bind(this)] /*validações assincronas*/
      ],
      confirmarEmail: [null,
        [FormValidations.equalsTo('email')]
      ],

      /** agrupar campos para dentro de 'endereco' */
      endereco: this.formBuilder.group({
        cep: [null, [Validators.required, FormValidations.cepValidator]],
        numero: [null, Validators.required],
        complemento: [null],
        rua: [null, Validators.required],
        bairro: [null, Validators.required],
        cidade: [null, Validators.required],
        estado: [null, Validators.required]
      }),
      cargo: [null],
      tecnologias: [null],
      newsletter: ['s'],
      termos: [null, Validators.pattern('true')], /* se o campo tiver TRUE tá validado, passa */
      frameworks: this.buildFrameworks()
    });

  }

  buildFrameworks() {
    const values = this.frameworks.map(v => new FormControl(false));
    return this.formBuilder.array(values, FormValidations.requiredMinCheckbox(1));
  }

  onSubmit() {
    console.log(this.formulario);

    // Form Array (Complexo..)
    let valueSubmit = Object.assign({}, this.formulario.value);
    valueSubmit = Object.assign(valueSubmit, {
      frameworks: valueSubmit.frameworks
        .map((v, i) => v ? this.frameworks[i] : null)
        .filter(v => v !== null)
    });
    console.log(valueSubmit);

    if (this.formulario.valid) {
      this.http.post('https://httpbin.org/post',
        JSON.stringify(this.formulario.value))
        .subscribe(dados => {
          // reseta o form
          this.formulario.reset();
        },
          (error: any) => alert('error'));
    } else {
      console.log('formulario invalido!');
      this.verificaValidacoesForm(this.formulario);
    }
  }

  /** recursividade, ele valida todos os campos, inclusive o formGroup de endereco */
  verificaValidacoesForm(formGroup: FormGroup) {
    Object.keys(formGroup.controls)
      .forEach(campo => {
        console.log(campo);
        const controle = formGroup.get(campo);
        controle.markAsDirty();
        if (controle instanceof FormGroup) {
          this.verificaValidacoesForm(controle);
        }
      });
  }



  aplicaCssErro(campo: string) {
    return {
      'has-error': this.verificaValidTouched(campo),
      'has-feedback': this.verificaValidTouched(campo)
    };
  }

  verificaValidTouched(campo: string) {
    return !this.formulario.get(campo).valid && this.formulario.get(campo).touched;
  }

  verificaEmailInvalido() {
    // console.log('Verifica email invalido!');
    const campoEmail = this.formulario.get('email');
    if (campoEmail.errors) {
      return campoEmail.errors['email'] && campoEmail.touched;
    }
    return false;
  }

  consultaCEP() {
    let cep = this.formulario.get('endereco.cep').value;

    if (cep != null && cep !== '') {
      this.cepService.consultaCEP(cep)
        .subscribe(dados => this.populaDadosForm(dados));
      // this.setarMeuNomeUsandoSingleSetValue();
    }
  }

  resetaDadosForm() {
    this.formulario.patchValue({
      endereco: {
        rua: null,
        complemento: null,
        bairro: null,
        cidade: null,
        estado: null
      }
    });
  }

  populaDadosForm(dados) {
    this.formulario.patchValue({
      endereco: {
        rua: dados.logradouro,
        complemento: dados.complemento,
        bairro: dados.bairro,
        cidade: dados.localidade,
        estado: dados.uf
      }
    });
  }

  setarMeuNomeUsandoSingleSetValue() {
    console.log('setarMeuNomeUsandoSingleSetValue()');
    this.formulario.get('nome').setValue('Alexandre Belem');
  }

  setarCargo() {
    const cargo = { nome: 'Developer', nivel: 'Pleno', desc: 'Developer Pl' };
    this.formulario.get('cargo').setValue(cargo);
  }

  compararCargos(obj1, obj2) {
    return obj1 && obj2 ? (obj1.nome === obj2.nome && obj1.nivel === obj2.nivel)
      : obj1 === obj2;
  }


  setarTecnologias() {
    const tecnologias = ['java', 'javascript', 'spa'];
    this.formulario.get('tecnologias').setValue(tecnologias);
  }



  verificaRequired(campo: string) {
    return (
      this.formulario.get(campo).hasError('required') &&
      (this.formulario.get(campo).touched || this.formulario.get(campo).dirty)
    );
  }

  validarEmail(formControl: FormControl) {
    return this.verificaEmailService.verificarEmail(formControl.value)
      .pipe(map(emailExiste => emailExiste ? { emailInvalido: true } : null));
  }

}
