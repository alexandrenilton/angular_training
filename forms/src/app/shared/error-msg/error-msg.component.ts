import { Component, OnInit, Input } from '@angular/core';
import { FormControl } from '@angular/forms';
import { FormValidations } from '../form-validations';

@Component({
  selector: 'app-error-msg',
  templateUrl: './error-msg.component.html',
  styleUrls: ['./error-msg.component.css']
})
export class ErrorMsgComponent implements OnInit {

  constructor() { }

  // cria somente a PROPRIEDADE errorMessage()
  get errorMessage() {
    for (const propertyName in this.control.errors) {
      if (this.control.errors.hasOwnProperty(propertyName) && this.control.touched) {
        return FormValidations.getErrorMsg(this.label, propertyName, this.control.errors[propertyName]);
      }
    }
    return null;
  }

  // @Input() msgErro: string;
  // @Input() mostrarErro: boolean;

  @Input() control: FormControl;
  @Input() label: string;


  static getErrorMsg(fieldName: string, validatorName: string, validatorValue?: any) {
    const config = {
      'required': `${fieldName} é obrigatório.`,
      'minlength': `${fieldName} precisa ter no mínimo ${validatorValue.requiredLength} caracteres`,
      'maxlength': `${fieldName} precisa ter no máximo ${validatorValue.requiredLength} caracteres`,
      'cepInvalido': 'CEP inválido'
    };
    return config[validatorName];
  }

  ngOnInit() {
  }

}
