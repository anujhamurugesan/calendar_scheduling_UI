import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-mini-calendar',
  templateUrl: './mini-calendar.component.html',
  styleUrls: ['./mini-calendar.component.scss'],
  standalone: false,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MiniCalendarComponent {
  daysOfWeek = ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'];
  currentMonthName = 'July 2022'; 
  
  days = [
    { num: 27, inactive: true }, { num: 28, inactive: true }, { num: 29, inactive: true }, { num: 30, inactive: true }, { num: 1, inactive: false }, { num: 2, inactive: false }, { num: 3, inactive: false },
    { num: 4, inactive: false }, { num: 5, inactive: false }, { num: 6, inactive: false }, { num: 7, inactive: false }, { num: 8, inactive: false }, { num: 9, inactive: false }, { num: 10, inactive: false },
    { num: 11, inactive: false, active: true }, { num: 12, inactive: false }, { num: 13, inactive: false }, { num: 14, inactive: false }, { num: 15, inactive: false }, { num: 16, inactive: false }, { num: 17, inactive: false },
    { num: 18, inactive: false }, { num: 19, inactive: false }, { num: 20, inactive: false }, { num: 21, inactive: false }, { num: 22, inactive: false }, { num: 23, inactive: false }, { num: 24, inactive: false },
    { num: 25, inactive: false }, { num: 26, inactive: false }, { num: 27, inactive: false }, { num: 28, inactive: false }, { num: 29, inactive: false }, { num: 30, inactive: false }, { num: 31, inactive: false }
  ];
}
