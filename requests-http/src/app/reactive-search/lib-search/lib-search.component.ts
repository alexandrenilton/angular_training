import {
  tap,
  map,
  filter,
  distinctUntilChanged,
  debounceTime,
  switchMap
} from 'rxjs/operators';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-lib-search',
  templateUrl: './lib-search.component.html',
  styleUrls: ['./lib-search.component.scss']
})
export class LibSearchComponent implements OnInit {
  // deve importar ReactiveFormsModule lá no module (reactive-search.module.ts)
  queryField = new FormControl();
  readonly SEARCH_URL = 'https://api.cdnjs.com/libraries';
  results$: Observable<any>;
  readonly FIELDS = 'name,description,version,homepage';
  total: number;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    // escutar mudanças de valores no campo
    this.results$ = this.queryField.valueChanges.pipe(
      map(value => value.trim()),
      filter(value => value.length > 1),
      debounceTime(300) /* delayzinho pra nao fazer varias requisiçoes*/,
      distinctUntilChanged() /* ignorar valores repetidos*/,
      // tap(value => console.log(value)),
      /* transforma o value recebido em um Observable*/
      switchMap(value =>
        this.http.get(this.SEARCH_URL, {
          params: {
            search: value,
            fields: this.FIELDS
          }
        })
      ),
      tap((res: any) => (this.total = res.total)),
      map((res: any) => {
        return res.results;
      })
    );
  }

  onSearch() {
    let value = this.queryField.value;

    if (value && (value = value.trim()) !== '') {
      // forma estática
      const params_ = {
        search: value,
        fields: this.FIELDS
      };

      // forma dinâmica
      let params = new HttpParams();
      params = params.set('search', value);
      params = params.set('fields', this.FIELDS);

      this.results$ = this.http
        // .get(`${this.SEARCH_URL}?fields=name,version,homepage&search=${value}`)
        .get(this.SEARCH_URL, { params })
        .pipe(
          tap((res: any) => (this.total = res.total)),
          map((res: any) => res.results)
        );
    }
  }
}

/**
 * Usar o cdnjs: https://api.cdnjs.com/libraries
 * Para mais informações: http://cdnjs.com/api
 */
