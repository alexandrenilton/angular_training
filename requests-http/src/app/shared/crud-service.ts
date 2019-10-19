import { take, tap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

// using generics
export class CrudService<T> {
  constructor(protected http: HttpClient, private API_URL) {}

  list() {
    return this.http.get<T[]>(this.API_URL).pipe(tap(console.log));
  }

  loadByID(id) {
    return this.http.get<T>(`${this.API_URL}/${id}`).pipe(take(1));
  }

  private create(record: T) {
    return this.http.post(this.API_URL, record).pipe(take(1));
  }

  private update(record: T) {
    // return this.http.put(`${this.API_URL}/${record.id}`, record).pipe(take(1));
    return this.http
      .put(`${this.API_URL}/${record['id']}`, record)
      .pipe(take(1));
  }

  save(record: T) {
    // if (record.id) {
    if (record['id']) {
      return this.update(record);
    } else {
      return this.create(record);
    }
  }

  remove(record: T) {
    // return this.http.delete(`${this.API_URL}/${record.id}`).pipe(take(1));
    return this.http.delete(`${this.API_URL}/${record['id']}`).pipe(take(1));
  }
}
