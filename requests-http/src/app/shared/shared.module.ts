import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlertModalComponent } from './alert-modal/alert-modal.component';
import { ConfirmModalComponent } from './confirm-modal/confirm-modal.component';

@NgModule({
  declarations: [AlertModalComponent, ConfirmModalComponent],
  imports: [CommonModule],
  exports: [AlertModalComponent],
  entryComponents: [
    AlertModalComponent,
    ConfirmModalComponent
  ] /* vai ser usado em tempo de execução e nao em template ou roteamento*/
})
export class SharedModule {}
