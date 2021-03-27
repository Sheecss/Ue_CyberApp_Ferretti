import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RdvListComponent } from './rdv-list/rdv-list.component';
import { RdvEditComponent } from './rdv-edit/rdv-edit.component';
import { OktaAuthGuard } from '@okta/okta-angular';

const routes: Routes = [
  {
    path: 'rdv-list',
    component: RdvListComponent,
    canActivate: [OktaAuthGuard]
  },
  {
    path: 'rdv-add',
    component: RdvEditComponent,
    canActivate: [OktaAuthGuard]
  },
  {
    path: 'rdv-edit/:id',
    component: RdvEditComponent,
    canActivate: [OktaAuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
