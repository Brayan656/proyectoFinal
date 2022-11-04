import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin.component';

const routes: Routes = [
  {
    path: 'invoice', 
    component: AdminComponent, 
    children: [ 
      {
        path: 'add',
        loadChildren: () => import('../add/add.module').then(m => m.AddModule)
      }
    ]
  }


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
