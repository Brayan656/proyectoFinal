import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { AddComponent } from './pages/products/add/add.component';

const routes: Routes = [
  {path:"login",component:LoginComponent},
  {path:"add", component:AddComponent},
  {path:"*",component:LoginComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
