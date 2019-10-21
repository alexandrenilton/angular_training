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

  download(url: string) {
    return this.http.get(url, {
      responseType: 'blob' as 'json'
      // reportProgress
      // content-length
    });
  }

  handleFile(res: any, fileName: string) {
    const file = new Blob([res], {
      type: res.type
    });

    // IE
    if (window.navigator && window.navigator.msSaveOrOpenBlob) {
      window.navigator.msSaveOrOpenBlob(file);
      return;
    }

    // para Chrome
    const blob = window.URL.createObjectURL(file);
    const link = document.createElement('a');
    link.href = blob;
    link.download = fileName;

    link.click();
    // FIREFOX
    link.dispatchEvent(
      new MouseEvent('click', {
        bubbles: true,
        cancelable: true,
        view: window
      })
    );
    setTimeout(() => {
      // para firefox
      window.URL.revokeObjectURL(blob);
      link.remove();
    }, 100);
  }
}
