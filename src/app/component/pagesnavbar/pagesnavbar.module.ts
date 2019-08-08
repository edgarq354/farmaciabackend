import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PagesnavbarComponent } from './pagesnavbar.component';

@NgModule({
  declarations: [PagesnavbarComponent],
  imports: [
    CommonModule
  ],
  exports: [PagesnavbarComponent]
})
export class PagesnavbarModule { }
