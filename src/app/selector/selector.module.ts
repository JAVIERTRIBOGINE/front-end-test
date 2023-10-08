import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { SelectorComponent } from './selector.component';
import { SelectTlModule } from '../shared/select/select.module';

@NgModule({
  imports: [SelectTlModule, BrowserModule],
  exports: [SelectorComponent],
  declarations: [SelectorComponent],
  providers: [],
})
export class SelectorModule {}
