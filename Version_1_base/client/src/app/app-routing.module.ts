import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RdvListComponent } from './rdv-list/rdv-list.component';
import { RdvEditComponent } from './rdv-edit/rdv-edit.component';

const routes: Routes = [
{ path: '', redirectTo: '/rdv-list', pathMatch: 'full' },
  {
    path: 'rdv-list',
    component: RdvListComponent,

  },
  {
    path: 'rdv-add',
    component: RdvEditComponent,

  },
  {
    path: 'rdv-edit/:id',
    component: RdvEditComponent,

  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
