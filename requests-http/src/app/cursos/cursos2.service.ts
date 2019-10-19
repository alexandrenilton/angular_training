import { HttpClient } from '@angular/common/http';
import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';

import { Curso } from './curso';
import { CrudService } from './../shared/crud-service';

@Injectable({
  providedIn: 'root'
})
export class Cursos2Service extends CrudService<Curso> {
  constructor(protected http: HttpClient) {
    super(http, `${environment.API}cursos`);
  }
}
