import { DataForm2Component } from './data-form2/data-form2.component';
import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { DataFormComponent } from './data-form/data-form.component';
import { TemplateFormComponent } from './template-form/template-form.component';

const routes: Routes = [
  { path: 'templateForm', component: TemplateFormComponent },
  { path: 'dataForm', component: DataForm2Component },
  { path: '', pathMatch: 'full', redirectTo: 'dataForm' } /** para redirecionar para dataForm (parte do data-driven) */
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
