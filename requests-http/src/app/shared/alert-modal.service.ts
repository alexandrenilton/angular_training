import { AlertModalComponent } from 'src/app/shared/alert-modal/alert-modal.component';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { Injectable } from '@angular/core';

enum AlertTypes {
  DANGER = 'danger',
  SUCCESS = 'success',
  INFO = 'info',
  WARNING = 'warning'
}

@Injectable({
  providedIn: 'root'
})
export class AlertModalService {
  constructor(private modalService: BsModalService) {}

  private showAlert(message: string, type: AlertTypes, dismissTimout?: number) {
    const bsModalRef: BsModalRef = this.modalService.show(AlertModalComponent);
    bsModalRef.content.type = type;
    bsModalRef.content.message = message;

    if (dismissTimout) {
      setTimeout(() => bsModalRef.hide(), dismissTimout);
    }
  }

  showAlertDanger(message: string) {
    this.showAlert(message, AlertTypes.DANGER);
  }

  showAlertSuccess(message: string) {
    this.showAlert(message, AlertTypes.SUCCESS, 2000);
  }

  showAlertInfo(message: string) {
    this.showAlert(message, AlertTypes.INFO);
  }

  showAlertWarning(message: string) {
    this.showAlert(message, AlertTypes.WARNING);
  }
}
