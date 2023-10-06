import { NgModule } from '@angular/core';
import { SelectComponent } from './select.component';
import { SelectItemComponent } from './select-item.component';

@NgModule({
  imports: [],
  declarations: [SelectComponent, SelectItemComponent],
  exports: [SelectComponent, SelectItemComponent],
  providers: [],
})
export class SelectTlModule {}
