import {
  Component,
  Input,
  HostListener,
  HostBinding,
  Host,
  forwardRef,
  Inject,
  OnChanges,
  SimpleChanges,
  ViewChild,
  ElementRef,
  AfterContentInit,
  ViewChildren,
} from '@angular/core';
import { SelectComponent } from './select.component';

@Component({
  selector: 'app-select-item',
  templateUrl: './select-item.component.html',
  styleUrls: ['./select-item.component.scss'],
})
export class SelectItemComponent implements /*OnChanges,*/ AfterContentInit {
  
  @Input()
  value: any;

  @Input()
  scrollPosition!: number

  @HostBinding('class.selected')
  selected = false;

  

  constructor(
    @Host()
    @Inject(forwardRef(() => SelectComponent))
    private parent?: SelectComponent,
  ) {}

  ngAfterContentInit(): void {
    // this.calendar.nativeElement.width = this.scrollPosition < 900 ? "60px": "46px";
  }

  // ngOnChanges(changes: SimpleChanges): void {
  //   console.log("scrollPosition", this.scrollPosition);
  //   console.log("Simple changes: ", changes)
  //   // this.calendar.nativeElement.width = this.scrollPosition < 900 ? "60px": "46px";

  // }

  @HostListener('click')
  click() {
    if (this.parent) {
      this.parent.onSelect(this);
    }
  }
}
