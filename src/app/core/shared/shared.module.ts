import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {MatInputModule} from '@angular/material/input';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatDialogModule} from '@angular/material/dialog';
import {MatMenuModule} from '@angular/material/menu';
@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MatInputModule
  ],exports:[
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    MatDialogModule,
    MatMenuModule
  ]
})
export class SharedModule { }
