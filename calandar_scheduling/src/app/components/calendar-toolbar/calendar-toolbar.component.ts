import { Component, ChangeDetectionStrategy, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { EventService } from '../../services/event.service';
import { DateUtils } from '../../utils/date.utils';
import { Subscription, tap } from 'rxjs';

@Component({
  selector: 'app-calendar-toolbar',
  templateUrl: './calendar-toolbar.component.html',
  styleUrls: ['./calendar-toolbar.component.scss'],
  standalone: false,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CalendarToolbarComponent implements OnInit, OnDestroy {
  currentView: 'Month' | 'Week' | 'Day' = 'Week';
  selectedDate: Date = new Date();
  private sub!: Subscription;

  constructor(private eventService: EventService, private cdr: ChangeDetectorRef) { }

  ngOnInit() {
    this.sub = this.eventService.selectedDate$.pipe(tap((date) => {
      this.selectedDate = date;
      this.cdr.detectChanges();
    })).subscribe();
  }

  get currentMonthYear(): string {
    return DateUtils.formatMonthYear(this.selectedDate);
  }

  setView(view: 'Month' | 'Week' | 'Day') {
    this.currentView = view;
  }

  goToToday() {
    this.eventService.setSelectedDate(DateUtils.getToday());
  }

  ngOnDestroy() {
    if (this.sub) this.sub.unsubscribe();
  }
}
