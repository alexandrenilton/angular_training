import { DataForm2Component } from './../data-form2/data-form2.component';
import { SharedModule } from './../shared/shared.module';
import { DataFormComponent } from './data-form.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    SharedModule,
    CommonModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  declarations: [
    DataFormComponent,
    DataForm2Component
  ]
})
export class DataFormModule { }
