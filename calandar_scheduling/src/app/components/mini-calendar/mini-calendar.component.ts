import { Component, ChangeDetectionStrategy, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { EventService } from '../../services/event.service';
import { DateUtils } from '../../utils/date.utils';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-mini-calendar',
  templateUrl: './mini-calendar.component.html',
  styleUrls: ['./mini-calendar.component.scss'],
  standalone: false,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MiniCalendarComponent implements OnInit, OnDestroy {
  daysOfWeek = ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'];
  currentMonthName = '';
  days: { num: number, inactive: boolean, isSelected?: boolean, date: Date }[] = [];

  private selectedDate: Date = new Date();
  private viewDate: Date = new Date();
  private sub!: Subscription;

  constructor(private eventService: EventService, private cdr: ChangeDetectorRef) { }

  ngOnInit() {
    this.sub = this.eventService.selectedDate$.subscribe(date => {
      this.selectedDate = date;
      this.viewDate = new Date(date);
      this.generateCalendar();
      this.cdr.detectChanges();
    });
  }

  ngOnDestroy() {
    if (this.sub) this.sub.unsubscribe();
  }

  changeMonth(offset: number) {
    this.viewDate.setMonth(this.viewDate.getMonth() + offset);
    this.generateCalendar();
    this.cdr.detectChanges();
  }

  generateCalendar() {
    const referenceDate = this.viewDate;
    const globalSelected = this.selectedDate;

    this.currentMonthName = DateUtils.formatMonthYear(referenceDate);

    const year = referenceDate.getFullYear();
    const month = referenceDate.getMonth();

    const firstDayOfMonth = new Date(year, month, 1);
    const lastDayOfMonth = new Date(year, month + 1, 0);
    const daysInMonth = lastDayOfMonth.getDate();

    let startingDayOfWeek = firstDayOfMonth.getDay() - 1;
    if (startingDayOfWeek === -1) startingDayOfWeek = 6;

    const previousMonthLastDay = new Date(year, month, 0).getDate();
    const grid: { num: number, inactive: boolean, isSelected?: boolean, date: Date }[] = [];

    for (let i = 0; i < startingDayOfWeek; i++) {
      const dayNum = previousMonthLastDay - startingDayOfWeek + 1 + i;
      grid.push({ num: dayNum, inactive: true, date: new Date(year, month, -startingDayOfWeek + i + 1) });
    }

    for (let i = 1; i <= daysInMonth; i++) {
      const cellDate = new Date(year, month, i);
      const isSelected = DateUtils.isSameDate(cellDate, globalSelected);
      grid.push({ num: i, inactive: false, isSelected, date: cellDate });
    }

    const remainingSlots = 42 - grid.length;
    for (let i = 1; i <= remainingSlots; i++) {
      grid.push({ num: i, inactive: true, date: new Date(year, month + 1, i) });
    }

    if (grid.length === 42 && grid[35].inactive && grid[35].num === 1) {
      this.days = grid.slice(0, 35);
    } else {
      this.days = grid;
    }
  }

  selectDate(d: any) {
    this.eventService.setSelectedDate(d.date);
  }
}
