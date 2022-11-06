import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AddRoutingModule } from './add-routing.module';
import { AddComponent } from './add.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from 'src/app/material/material.module';


@NgModule({
  declarations: [AddComponent],
  imports: [
    CommonModule,
    AddRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule
  ], exports : [
    AddComponent
  ]
})
export class AddModule { }
