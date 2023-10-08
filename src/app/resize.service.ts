import { Injectable, QueryList } from '@angular/core';
import { debounceTime, fromEvent, Observable, Subscription } from 'rxjs';
import { SelectItemComponent } from './shared/select/select-item.component';

@Injectable({
  providedIn: 'root'
})
export class ResizeService {
  resize$!: Observable<any>;
  constructor() {
    this.resize$ = fromEvent(window, 'resize')
    .pipe(debounceTime(200));
  }

  
}
