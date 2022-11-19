import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin.component';
import { AuthService } from '../../../_service/auth.service';

const routes: Routes = [
  {
    path: '', 
    component: AdminComponent, canActivate : [AuthService] 
  },
  {
    path: 'add',
    loadChildren: () => import('../add/add.module').then(m => m.AddModule)
  },
  {
    path: 'edit/:id',
    loadChildren: () => import('../add/add.module').then(m => m.AddModule)
  }


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
