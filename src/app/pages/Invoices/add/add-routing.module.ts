import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthService } from 'src/app/_service/auth.service';
import { AddComponent } from './add.component';

const routes: Routes = [
  {
    path: '',
    component: AddComponent, canActivate : [AuthService] 
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AddRoutingModule { }
