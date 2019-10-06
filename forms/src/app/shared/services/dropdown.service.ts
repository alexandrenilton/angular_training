import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { EstadoBr } from './../models/estado-br.model';
import { Cidade } from '../models/cidade';
import { map } from '../../../../node_modules/rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DropdownService {
  constructor(private http: HttpClient) { }

  getEstadosBr() {
    return this.http.get<EstadoBr[]>('assets/dados/estadosbr.json');
  }

  getCidades(idEstado: number) {
    return this.http.get<Cidade[]>('assets/dados/cidades.json')
      .pipe(
        // tslint:disable-next-line:triple-equals
        map((cidades: Cidade[]) => cidades.filter(c => c.estado == idEstado))
      );
  }

  getCargos() {
    return [
      { nome: 'Developer', nivel: 'Junior', desc: 'Developer Jr' },
      { nome: 'Developer', nivel: 'Pleno', desc: 'Developer Pl' },
      { nome: 'Developer', nivel: 'Senior', desc: 'Developer Sr' },
      { nome: 'DBA', nivel: 'Pleno', desc: 'DBA Pl' },
      { nome: 'DevOps', nivel: 'Pleno', desc: 'DevOps Pleno' }
    ];
  }

  getTecnologias() {
    return [
      { nome: 'java', desc: 'Java' },
      { nome: 'javascript', desc: 'JavaScript' },
      { nome: 'php', desc: 'PHP' },
      { nome: 'ruby', desc: 'Ruby' },
      { nome: 'docker', desc: 'Docker' },
      { nome: 'kubernets', desc: 'Kubernets' },
      { nome: 'spa', desc: 'SPA' }
    ];
  }

  getNewsletter() {
    return [
      { valor: 's', desc: 'Oui' },
      { valor: 'n', desc: 'Non' }
    ];
  }
}
