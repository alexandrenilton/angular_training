import { environment } from './../../../environments/environment';
import { Component, OnInit } from '@angular/core';
import { UploadFileService } from './upload-file.service';
import { HttpEventType, HttpEvent } from '@angular/common/http';
import { uploadProgress, filterResponse } from 'src/app/shared/rxjs-operators';

@Component({
  selector: 'app-upload-file',
  templateUrl: './upload-file.component.html',
  styleUrls: ['./upload-file.component.scss']
})
export class UploadFileComponent implements OnInit {
  files: Set<File>;
  progress = 0;

  constructor(private uploadFileService: UploadFileService) {}

  ngOnInit() {}

  onChange(event) {
    // console.log(event);
    const selectedFiles = <FileList>event.srcElement.files;

    // document.getElementById('customFileLabel').innerHTML =
    //   selectedFiles[0].name;

    // se forem multiplos arquivos para upload
    const fileNames = [];
    this.files = new Set();

    for (let i = 0; i < selectedFiles.length; i++) {
      fileNames.push(selectedFiles[i].name);
      this.files.add(selectedFiles[i]);
    }
    document.getElementById('customFileLabel').innerHTML = fileNames.join(', ');
    this.progress = 0; // resetar por arquivos..
  }

  onUpload() {
    if (this.files && this.files.size > 0) {
      this.uploadFileService
        .upload(this.files, environment.BASE_URL + '/upload')
        .pipe(
          // uploadProgress e filterResponse são operadores customizados do rxjs
          uploadProgress(progress => {
            console.log(progress);
            this.progress = progress;
          }),
          filterResponse()
        )
        .subscribe(response => console.log('upload concluído com sucesso!'));

      // .subscribe((event: HttpEvent<Object>) => {
      //   // HttpEventType;
      //   // console.log(event);

      //   if (event.type === HttpEventType.Response) {
      //     // foi concluido..
      //     // console.log('upload concluido!');
      //   } else if (event.type === HttpEventType.UploadProgress) {
      //     // recebendo upload do arquivo ainda..
      //     const percentDone = Math.round((event.loaded * 100) / event.total);
      //     // console.log('Progresso', percentDone);
      //     this.progress = percentDone;
      //   }
      // });
    }
  }
}
