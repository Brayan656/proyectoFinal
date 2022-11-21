import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { RegistroComponent } from './pages/registro/registro.component';
import { AddComponent } from './pages/products/add/add.component';
import { AdminComponent } from './pages/Invoices/admin/admin.component';
import { ListComponent } from './pages/products/list/list.component';
import { SeeComponent } from './pages/products/see/see.component';

const routes: Routes = [
  {path:"login",component:LoginComponent},
  {path:"registro",component:RegistroComponent},
  {path:"add", component:AddComponent},
  {path:"list", component:ListComponent},
  {path:"see/:id", component:SeeComponent},
  {path:"*",component:LoginComponent},
  {path:'invoice', loadChildren : () => import('./pages/Invoices/admin/admin.module').then(m => m.AdminModule)}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
