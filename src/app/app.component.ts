import {
  Component,
  OnInit,
} from '@angular/core';
import { Day } from './selector/day';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { ResizeService } from './resize.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  days: Array<Day> = [];

  form!: FormGroup;

  multiple: boolean = true;
  resize$: Observable<Event> = this.resizeService.resize$;

  constructor(private formBuilder: FormBuilder, private resizeService: ResizeService) {
    for (let i = 0; i < 100; i++) {
      this.days.push(new Day(i, new Date(i * 100000000)));
    }
  }

  ngOnInit() {
    this.form = this.formBuilder.group({
      selectedDays: [[this.days[0]]],
    });
  }
}
