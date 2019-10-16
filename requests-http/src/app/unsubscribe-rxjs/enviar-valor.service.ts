import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EnviarValorService {
  /** Subject é um emissor do rxjs */
  private emissor$ = new Subject<string>();

  emitirValor(valor: string) {
    this.emissor$.next(valor); // chama o emissor
  }

  getValor() {
    return this.emissor$.asObservable(); // retorna o emissor como Observable
  }

}
