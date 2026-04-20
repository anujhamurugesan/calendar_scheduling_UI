import { Component, ChangeDetectionStrategy, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { EventService, EventData } from '../../services/event.service';
import { Subscription, combineLatest, tap } from 'rxjs';

interface DayData {
  name: string;
  date: string;
  active: boolean;
  events: EventData[];
  fullDateStr: string;
}

@Component({
  selector: 'app-week-grid',
  templateUrl: './week-grid.component.html',
  styleUrls: ['./week-grid.component.scss'],
  standalone: false,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class WeekGridComponent implements OnInit, OnDestroy {
  hours = Array.from({ length: 24 }, (_, i) => i);
  days: DayData[] = [];
  draftEvent: EventData | null = null;
  currentTimeTop: string = '';

  private eventSub!: Subscription;
  private prefillSub!: Subscription;
  private timeInterval: any;
  private selectedDate: Date = new Date();

  constructor(private eventService: EventService, private cdr: ChangeDetectorRef) { }

  ngOnInit() {
    this.eventSub = combineLatest([
      this.eventService.events$,
      this.eventService.selectedDate$
    ]).subscribe(([events, date]) => {
      this.selectedDate = date;
      this.generateCurrentWeek(events, date);
      this.updateCurrentTimeLine();
      this.cdr.detectChanges();
    });

    this.prefillSub = this.eventService.modalPrefill$.pipe(
      tap(prefill => {
        if (prefill) {
          const dummy: EventData = {
            title: 'draft',
            date: prefill.date,
            time: `${prefill.startTime} - ${prefill.endTime}`
          };
          this.draftEvent = this.calculatePosition(dummy);
        } else {
          this.draftEvent = null;
        }
        this.cdr.detectChanges();
      })
    ).subscribe();

    this.timeInterval = setInterval(() => {
      this.updateCurrentTimeLine();
    }, 60000);
  }

  updateCurrentTimeLine() {
    const now = new Date();
    const currentHour = now.getHours();
    const currentMinute = now.getMinutes();
    const topPx = (currentHour * 60) + currentMinute;
    this.currentTimeTop = `${topPx}px`;
  }

  ngOnDestroy() {
    if (this.eventSub) this.eventSub.unsubscribe();
    if (this.prefillSub) this.prefillSub.unsubscribe();
    if (this.timeInterval) clearInterval(this.timeInterval);
  }

  generateCurrentWeek(allEvents: EventData[], referenceDate: Date = new Date()) {
    const currentDayOfWeek = referenceDate.getDay();
    const startOfWeek = new Date(referenceDate);
    startOfWeek.setDate(referenceDate.getDate() - currentDayOfWeek);

    const weekDays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

    this.days = [];

    for (let i = 0; i < 7; i++) {
      const activeDate = new Date(startOfWeek);
      activeDate.setDate(startOfWeek.getDate() + i);

      const isSelected = activeDate.getDate() === referenceDate.getDate() &&
        activeDate.getMonth() === referenceDate.getMonth() &&
        activeDate.getFullYear() === referenceDate.getFullYear();

      const today = new Date();
      const isToday = activeDate.getDate() === today.getDate() &&
        activeDate.getMonth() === today.getMonth() &&
        activeDate.getFullYear() === today.getFullYear();

      const year = activeDate.getFullYear();
      const month = String(activeDate.getMonth() + 1).padStart(2, '0');
      const dayStr = String(activeDate.getDate()).padStart(2, '0');
      const formattedDate = `${year}-${month}-${dayStr}`;

      const dayEvents = allEvents.filter(ev => ev.date === formattedDate);
      const computedEvents = dayEvents.map(ev => this.calculatePosition(ev));

      this.days.push({
        name: weekDays[i],
        date: activeDate.getDate().toString(),
        active: isSelected,
        fullDateStr: formattedDate,
        events: computedEvents
      });
    }
  }

  onDayHeaderClick(day: DayData) {
    const [year, month, dayNum] = day.fullDateStr.split('-').map(Number);
    this.eventService.setSelectedDate(new Date(year, month - 1, dayNum));
  }

  calculatePosition(event: EventData): EventData {
    if (!event.time) return event;
    const parts = event.time.split(' - ');
    if (parts.length !== 2) return event;

    const [startHour, startMin] = parts[0].split(':').map(Number);
    const [endHour, endMin] = parts[1].split(':').map(Number);

    const baselineHour = 0;

    const topPx = ((startHour - baselineHour) * 60) + startMin;
    const durationMins = ((endHour * 60) + endMin) - ((startHour * 60) + startMin);

    return {
      ...event,
      top: `${topPx}px`,
      height: `${durationMins}px`
    };
  }

  formatHour(hour: number): string {
    const ampm = hour >= 12 ? 'pm' : 'am';
    const h = hour === 0 ? 12 : (hour > 12 ? hour - 12 : hour);
    return `${h} ${ampm}`;
  }

  onSlotClick(day: DayData, hour: number, event: MouseEvent) {
    const startObj = new Date();
    startObj.setHours(hour, 0, 0, 0);

    const endObj = new Date(startObj.getTime() + 60 * 60 * 1000);

    const startTimeStr = `${String(startObj.getHours()).padStart(2, '0')}:${String(startObj.getMinutes()).padStart(2, '0')}`;
    const endTimeStr = `${String(endObj.getHours()).padStart(2, '0')}:${String(endObj.getMinutes()).padStart(2, '0')}`;

    let startingTime = event.clientX + 20;
    let endingTime = event.clientY - 40;

    if (startingTime + 350 > window.innerWidth) startingTime -= 380;
    if (endingTime + 400 > window.innerHeight) endingTime = window.innerHeight - 420;
    if (endingTime < 20) endingTime = 20;

    this.eventService.openModal(day.fullDateStr, startTimeStr, endTimeStr, startingTime, endingTime);
  }
}
