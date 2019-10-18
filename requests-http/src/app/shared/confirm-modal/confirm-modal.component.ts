import { BsModalRef } from 'ngx-bootstrap/modal';
import { Component, OnInit, Input } from '@angular/core';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-confirm-modal',
  templateUrl: './confirm-modal.component.html',
  styleUrls: ['./confirm-modal.component.scss']
})
export class ConfirmModalComponent implements OnInit {
  /* input properties */
  @Input() title: string;
  @Input() msg: string;
  @Input() cancelTxt = 'Cancelar';
  @Input() okTxt = 'Sim';

  /* emitir valores para quem chamou essa popup genérica*/
  confirmResult: Subject<boolean>;

  constructor(private bsModalRef: BsModalRef) {}

  ngOnInit() {
    this.confirmResult = new Subject();
  }

  onClose() {
    this.confirmAndClose(false);
  }

  onConfirm() {
    this.confirmAndClose(true);
  }

  private confirmAndClose(value: boolean) {
    this.confirmResult.next(value); // emitir o valor de true ou false no subject, ou seja, usuario quer confirmar ação
    this.bsModalRef.hide();
  }
}
