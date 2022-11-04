import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { RegistroComponent } from './pages/registro/registro.component';
import { AddComponent } from './pages/products/add/add.component';
import { AdminComponent } from './pages/Invoices/admin/admin.component';

const routes: Routes = [
  {path:"login",component:LoginComponent},
  {path:"registro",component:RegistroComponent},
  {path:"add", component:AddComponent},
  {path:"*",component:LoginComponent},
  {path:'invoice', component:AdminComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
