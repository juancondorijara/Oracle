import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

//EXTRAS
import { AppComponent } from './app.component';
import { ClienteFormComponent } from './cliente/components/cliente-form/cliente-form.component';
import { ClienteListComponent } from './cliente/components/cliente-list/cliente-list.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'cliente-form'
  },
  {
    path: 'cliente-list',
    component: ClienteListComponent
  },
  {
    path: 'cliente-form',
    component: ClienteFormComponent
  },
  {
    path: 'app',
    component: AppComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
