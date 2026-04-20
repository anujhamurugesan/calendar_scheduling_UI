import { Component, ChangeDetectionStrategy, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { EventService, EventData } from '../../services/event.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
  standalone: false,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SidebarComponent implements OnInit, OnDestroy {
  calendars = [
    { name: 'Antonio Larentio', checked: true, count: 8 },
    { name: 'Tasks', checked: false, count: 0 },
    { name: 'Birthdays', checked: false, count: 6 }
  ];

  categories = [
    { name: 'Personal', color: '#ffb347', value: 70 },
    { name: 'Work', color: '#87ceeb', value: 40 },
    { name: 'Health', color: '#ff69b4', value: 60 }
  ];

  upcomingEvent: EventData | null = null;
  etaString: string = '';
  private sub!: Subscription;

  constructor(private eventService: EventService, private cdr: ChangeDetectorRef) { }

  ngOnInit() {
    this.sub = this.eventService.events$.subscribe(events => {
      this.upcomingEvent = this.findUpcoming(events);
      this.cdr.detectChanges();
    });
  }

  ngOnDestroy() {
    if (this.sub) this.sub.unsubscribe();
  }

  findUpcoming(allEvents: EventData[]): EventData | null {
    if (!allEvents.length) return null;

    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    const todayStr = `${year}-${month}-${day}`;
    const todayEvents = allEvents.filter(ev => ev.date === todayStr && ev.time);
    if (!todayEvents.length) return allEvents[0];

    let closestEvent = null;
    let minTimeDiff = Infinity;

    for (let ev of todayEvents) {
      if (!ev.startTime) continue;

      const [sh, sm] = ev.startTime.split(':').map(Number);
      const evDate = new Date();
      evDate.setHours(sh, sm, 0, 0);

      const diffMins = (evDate.getTime() - now.getTime()) / 60000;
      if (diffMins > -60 && diffMins < minTimeDiff) {
        minTimeDiff = diffMins;
        closestEvent = ev;
      }
    }

    if (closestEvent) {
      this.etaString = minTimeDiff >= 0
        ? `🔔 In ${Math.ceil(minTimeDiff)} min`
        : `🔔 Started ${Math.abs(Math.ceil(minTimeDiff))} min ago`;
      return closestEvent;
    }

    return allEvents[0] || null;
  }
}
