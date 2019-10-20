import { HttpClient, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UploadFileService {
  constructor(private http: HttpClient) {}

  /* set de arquivos e o endpoint */
  upload(files: Set<File>, url: string) {
    const formData = new FormData();
    files.forEach(file => {
      console.log('dados do file.: ');
      console.log(file.name);
      formData.append('file', file, file.name);
      // formData.append('file', file);
    });

    // const request = new HttpRequest('POST', url, formData);
    // return this.http.request(request);
    // ou..
    return this.http.post(url, formData, {
      observe: 'events',
      reportProgress: true /*para reportar o progresso do upload*/
    });
  }
}
