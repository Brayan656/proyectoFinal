import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
<<<<<<< HEAD
import { RegistroComponent } from './pages/registro/registro.component';

const routes: Routes = [
  {path:"login",component:LoginComponent},
  {path:"registro",component:RegistroComponent},
=======
import { AddComponent } from './pages/products/add/add.component';

const routes: Routes = [
  {path:"login",component:LoginComponent},
  {path:"add", component:AddComponent},
>>>>>>> 0edad32d6d6bfe657d68bef8ea1442a2cfc800e8
  {path:"*",component:LoginComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
