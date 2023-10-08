import {
  Component,
  Input,
  QueryList,
  AfterContentInit,
  Output,
  EventEmitter,
  OnInit,
  ViewChildren,
  ElementRef,
  ViewChild,
  AfterViewInit,
  SimpleChanges,
  OnChanges,
  AfterViewChecked,
  ChangeDetectionStrategy,
} from '@angular/core';
import { AbstractNgModel } from '../model/abstract-ngmodel';
import { SelectItemComponent } from './select-item.component';
import { ngModelProvider } from '../model/ng-model-config';
import { Observable, Subject } from 'rxjs';
import { Day } from 'src/app/selector/day';
import { calculateElementWidth } from '../dom-utils';

@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss'],
  providers: [ngModelProvider(SelectComponent)],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SelectComponent
  extends AbstractNgModel<any>
  implements OnInit, AfterContentInit, AfterViewChecked
{
  @Input()
  multiple = false;

  @Input() days!: Day[];

  @Input() resize$!: Observable<Event>;

  public beggining: boolean = false;

  /**
   * Only for multiple = true
   */
  @Input()
  max!: number;

  /**
   * Keeps always one selected if you init at first one value. If you don't do
   * it, no value will be initialized at first
   */
  @Input()
  alwaysOneSelected = true;

  @Output()
  changeDay = new EventEmitter<any>();

  @ViewChildren(SelectItemComponent)
  children!: QueryList<SelectItemComponent>;

  scrollPosition!: number;
  private modelChecker = new Subject<any>();

  @ViewChild('calendarContainer', { read: ElementRef })
  public calendarContainer!: ElementRef<any>;
  
  @ViewChildren("calendar") calendar!: QueryList<ElementRef>;

  get beg() {
    return (
      this.calendarContainer?.nativeElement?.scrollLeft <= this.scrollPosition
    );
  }

  get sizeClass() {
    return this.scrollPosition < 900 ? "large" : this.scrollPosition < 1108?  "medium": "small";
  }

  ngOnInit(): void {
    this.resize$.subscribe((_event: any) => {
      this.scrollPosition = calculateElementWidth(this.calendarContainer?.nativeElement);
    });
    if (this.multiple) {
      this.model = [];
    }
  }

  ngAfterContentInit(): void {
    this.modelChecker.subscribe(() => this.doCheck());
  }

  ngAfterViewChecked(): void {
    this.scrollPosition = this.calendarContainer? calculateElementWidth(this.calendarContainer.nativeElement): 1108;
    this.modelChecker.subscribe(() => this.doCheck());
  }

  override writeValue(obj: any): void {
    if (this.multiple && !Array.isArray(obj)) {
      this.model = [];
    } else {
      this.model = obj;
    }
    this.modelChecker.next(this.model);
  }

  doCheck() {
    if (this.multiple) {
      this.children.forEach((child) => {
        child.selected =
          this.model.filter((id: any) => child.value === id).length > 0;
      });
    } else {
      if (typeof this.model !== 'undefined') {
        let selectedChild = this.children.find(
          (child) => child.value === this.model,
        );
        if (selectedChild) {
          selectedChild.selected = true;
        }
      }
    }
  }

  onSelect(child: SelectItemComponent) {
    if (this.multiple) {
      let idx = this.model.indexOf(child.value);
      if (idx >= 0) {
        if (!(this.alwaysOneSelected && this.model.length === 1)) {
          this.model.splice(idx, 1);
          child.selected = false;
          this.notify();
        }
      } else {
        if (!this.max || this.model.length < this.max) {
          this.model.push(child.value);
          child.selected = true;
          this.notify();
        }
      }
    } else {
      if (this.model === child.value) {
        if (!this.alwaysOneSelected) {
          this.model = undefined;
          child.selected = false;
          this.notify();
        }
      } else {
        this.model = child.value;
        this.unselectOthers(child);
        child.selected = true;
        this.notify();
      }
    }
  }

  public scrollRight(): void {
    this.calendarContainer.nativeElement.scrollTo({
      left:
        this.calendarContainer.nativeElement.scrollLeft + this.scrollPosition,
      behavior: 'smooth',
    });
    console.log('position: ', this.scrollPosition);
    console.log('beggining?: ', this.beg);
  }

  public scrollLeft(): void {
    const leftPosition: number =
      this.calendarContainer.nativeElement.scrollLeft;

    this.calendarContainer.nativeElement.scrollTo({
      left: leftPosition - this.scrollPosition,
      behavior: 'smooth',
    });
    console.log(
      'scrollLeft: ',
      this.calendarContainer.nativeElement.scrollLeft,
    );
  }
  private notify(): void {
    this.changeDay.emit(this.model);
  }

  private unselectOthers(child: SelectItemComponent) {
    this.children.forEach((c) => {
      if (c !== child) {
        c.selected = false;
      }
    });
  }
}
