import { NgModule } from '@angular/core';
import { SelectComponent } from './select.component';
import { SelectItemComponent } from './select-item.component';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [BrowserModule, FormsModule],
  declarations: [SelectComponent, SelectItemComponent],
  exports: [SelectComponent, SelectItemComponent],
  providers: [],
})
export class SelectTlModule {}
