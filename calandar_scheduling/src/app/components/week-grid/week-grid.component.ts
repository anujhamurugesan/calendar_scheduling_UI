import { Component, ChangeDetectionStrategy, OnInit } from '@angular/core';

interface EventData {
  title: string;
  time: string;
  color: string;
  top?: string;
  height?: string;
  users: string[];
}

interface DayData {
  name: string;
  date: string;
  active: boolean;
  events: EventData[];
}

@Component({
  selector: 'app-week-grid',
  templateUrl: './week-grid.component.html',
  styleUrls: ['./week-grid.component.scss'],
  standalone: false,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class WeekGridComponent implements OnInit {
  hours = Array.from({ length: 13 }, (_, i) => i + 6); 
  days: DayData[] = [];

  ngOnInit() {
    this.generateCurrentWeek();
  }

  generateCurrentWeek() {
    const today = new Date();
    const currentDayOfWeek = today.getDay(); // 0 (Sunday) to 6 (Saturday)
    
    // Align to Sunday
    const startOfWeek = new Date(today);
    startOfWeek.setDate(today.getDate() - currentDayOfWeek);

    const weekDays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

    // Mockup mapped natively to 0-6 index
    const mockupEventsByDayIndex: { [key: number]: EventData[] } = {
      0: [
        { title: 'Booking taxi app', time: '06:00 - 07:30', color: '#bfdbfe', users: ['assets/u1.png', 'assets/u3.png'] },
        { title: 'Development meet', time: '06:00 - 08:00', color: '#c4b5fd', users: [] }
      ],
      1: [
        { title: 'Design onboarding', time: '06:00 - 07:10', color: '#a7f3d0', users: [] },
        { title: 'Book offsite', time: '07:30 - 10:00', color: '#fef08a', users: ['assets/u1.png','assets/u2.png'] }
      ]
    };

    for (let i = 0; i < 7; i++) {
      const activeDate = new Date(startOfWeek);
      activeDate.setDate(startOfWeek.getDate() + i);

      const isActive = activeDate.getDate() === today.getDate() && 
                       activeDate.getMonth() === today.getMonth() && 
                       activeDate.getFullYear() === today.getFullYear();

      const events = mockupEventsByDayIndex[i] || [];
      const computedEvents = events.map(ev => this.calculatePosition(ev));

      this.days.push({
        name: weekDays[i],
        date: activeDate.getDate().toString(),
        active: isActive,
        events: computedEvents
      });
    }
  }

  calculatePosition(event: EventData): EventData {
    const parts = event.time.split(' - ');
    if (parts.length !== 2) return event;

    const [startHour, startMin] = parts[0].split(':').map(Number);
    const [endHour, endMin] = parts[1].split(':').map(Number);

    const baselineHour = 6;
    
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
    const h = hour > 12 ? hour - 12 : hour;
    return `${h} ${ampm}`;
  }
}
