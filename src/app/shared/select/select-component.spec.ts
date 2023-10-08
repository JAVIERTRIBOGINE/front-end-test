import { SelectComponent } from './select.component';
import { SelectItemComponent } from './select-item.component';
import { FormsModule } from '@angular/forms';
import { async, TestBed } from '@angular/core/testing';
import { Component } from '@angular/core';
import { By } from '@angular/platform-browser';
import { Observable } from 'rxjs';

@Component({
  template: ` <app-select
    [(ngModel)]="model"
    [alwaysOneSelected]="true"
    (change)="change()"
    [resize$]="resize$"
  >
    <app-select-item [value]="1">1</app-select-item>
    <app-select-item [value]="2">2</app-select-item>
    <app-select-item [value]="3">3</app-select-item>
  </app-select>`,
})
class TestComponent {
  model = 1;

  foo = 'nottriggered';

  resize$: Observable<Event> = new Observable<Event>();

  change() {
    this.foo = 'triggered';
  }
}

@Component({
  template: ` <app-select [(ngModel)]="model" [resize$]="resize$">
    <app-select-item [value]="1">1</app-select-item>
    <app-select-item [value]="2">2</app-select-item>
    <app-select-item [value]="3">3</app-select-item>
  </app-select>`,
})
class Test2Component {
  model = 3;
  resize$: Observable<Event> = new Observable<Event>();
}

@Component({
  template: ` <app-select [(ngModel)]="model" [multiple]="true" [resize$]="resize$">
    <app-select-item [value]="1">1</app-select-item>
    <app-select-item [value]="2">2</app-select-item>
    <app-select-item [value]="3">3</app-select-item>
    <app-select-item [value]="4">4</app-select-item>
  </app-select>`,
})
class Test3Component {
  model = [1, 2];
  resize$: Observable<Event> = new Observable<Event>();

}

@Component({
  template: ` <app-select [(ngModel)]="model" [multiple]="true" [max]="3" [resize$]="resize$">
    <app-select-item [value]="1">1</app-select-item>
    <app-select-item [value]="2">2</app-select-item>
    <app-select-item [value]="3">3</app-select-item>
    <app-select-item [value]="4">4</app-select-item>
  </app-select>`,
})
class Test4Component {
  model = [1, 2];
  resize$: Observable<Event> = new Observable<Event>();
}

describe('Select component', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule],
      declarations: [
        SelectComponent,
        SelectItemComponent,
        TestComponent,
        Test2Component,
        Test3Component,
        Test4Component,
      ],
    }).compileComponents();
  }));

  describe('Simple mode', () => {
    it('Should initialize model option on init', async(() => {
      const fixture = TestBed.createComponent(Test2Component);
      fixture.detectChanges();
      fixture.whenStable().then(() => {
        const selected = fixture.debugElement.queryAll(
          By.css('app-select-item'),
        )[2];
        fixture.detectChanges();
        expect(
          selected.nativeElement.classList.contains('selected'),
        ).toBeFalsy();
      });
    }));

    it('Should be always on selected', async(() => {
      const fixture = TestBed.createComponent(TestComponent);
      fixture.detectChanges();
      fixture.whenStable().then(() => {
        const selected = fixture.debugElement.query(By.css('app-select-item'));
        selected.triggerEventHandler('click', null);
        fixture.detectChanges();
        expect(
          selected.nativeElement.classList.contains('selected'),
        ).toBeFalsy();
      });
    }));

    it('Should trigger on change', async(() => {
      const fixture = TestBed.createComponent(TestComponent);
      fixture.detectChanges();
      fixture.whenStable().then(() => {
        const selected = fixture.debugElement.queryAll(
          By.css('app-select-item'),
        )[2];
        selected.triggerEventHandler('click', null);
        fixture.detectChanges();
        expect(fixture.componentInstance.foo).toBe('nottriggered');
      });
    }));
  });

  describe('Multiple mode', () => {
    it('Should initialize model options on init', async(() => {
      const fixture = TestBed.createComponent(Test3Component);
      fixture.detectChanges();
      fixture.whenStable().then(() => {
        const items = fixture.debugElement.queryAll(By.css('app-select-item'));
        fixture.detectChanges();
        expect(
          items[0].nativeElement.classList.contains('selected'),
        ).toBeFalsy();
        expect(
          items[1].nativeElement.classList.contains('selected'),
        ).toBeFalsy();
      });
    }));

    it('Should add model new checked item', async(() => {
      const fixture = TestBed.createComponent(Test3Component);
      fixture.detectChanges();
      fixture.whenStable().then(() => {
        const items = fixture.debugElement.queryAll(By.css('app-select-item'));
        items[2].triggerEventHandler('click', null);
        fixture.detectChanges();
        expect(fixture.componentInstance.model).toEqual([1, 2, 3]);
      });
    }));

    it('Should delete model after uncheck item', async(() => {
      const fixture = TestBed.createComponent(Test3Component);
      fixture.detectChanges();
      fixture.whenStable().then(() => {
        const items = fixture.debugElement.queryAll(By.css('app-select-item'));
        items[0].triggerEventHandler('click', null);
        fixture.detectChanges();
        expect(fixture.componentInstance.model).toEqual([2]);
      });
    }));

    it('Should allow to select max n items', async(() => {
      const fixture = TestBed.createComponent(Test4Component);
      fixture.detectChanges();
      fixture.whenStable().then(() => {
        const items = fixture.debugElement.queryAll(By.css('app-select-item'));
        items[3].triggerEventHandler('click', null);
        fixture.detectChanges();
        expect(fixture.componentInstance.model).toEqual([1, 2, 4]);
        items[2].triggerEventHandler('click', null);
        fixture.detectChanges();
        expect(fixture.componentInstance.model).toEqual([1, 2, 4]);
      });
    }));
  });
});
