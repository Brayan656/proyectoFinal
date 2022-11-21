import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './pages/login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from './material/material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RegistroComponent } from './pages/registro/registro.component';
import { HttpClientModule } from '@angular/common/http';
import { AddComponent } from './pages/products/add/add.component';
import { ListComponent } from './pages/products/list/list.component';
import { EditComponent } from './pages/products/list/edit/edit.component';
import { SeeComponent } from './pages/products/see/see.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegistroComponent,
    AddComponent,
    ListComponent,
    EditComponent,
    SeeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    MaterialModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  entryComponents:[
    EditComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
