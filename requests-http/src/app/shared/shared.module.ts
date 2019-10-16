import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlertModalComponent } from './alert-modal/alert-modal.component';



@NgModule({
  declarations: [AlertModalComponent],
  imports: [
    CommonModule
  ],
  exports: [
    AlertModalComponent
  ],
  entryComponents: [
    AlertModalComponent
  ] /* vai ser usado em tempo de execução e nao em template ou roteamento*/
})
export class SharedModule { }
