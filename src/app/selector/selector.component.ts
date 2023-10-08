import { Component, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { AbstractNgModel } from '../shared/model/abstract-ngmodel';
import { ngModelProvider } from '../shared/model/ng-model-config';
import { Day } from './day';

@Component({
  selector: 'app-selector',
  templateUrl: './selector.component.html',
  styleUrls: ['./selector.component.scss'],
  providers: [ngModelProvider(SelectorComponent)],
})
export class SelectorComponent implements AbstractNgModel<any> {
  @Input() resize$!: Observable<Event>;

  public model: any;
  modelChange: any;
  modelTouch: any;

  @Input() days: Day[] = [];
  @Input() multiple!: boolean;

  value: Day[] = [];

  onChange: any = () => {};
  onTouch: any = () => {};

  writeValue(value: any): void {
    if (value !== undefined) {
      this.value = value;
    }
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  onChildChange(event: Day[]): void {
    this.onChange(event);
  }

  registerOnTouched(fn: any): void {
    this.onTouch = fn;
  }
}
