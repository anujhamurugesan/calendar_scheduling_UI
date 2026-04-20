import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-calendar-toolbar',
  templateUrl: './calendar-toolbar.component.html',
  styleUrls: ['./calendar-toolbar.component.scss'],
  standalone: false,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CalendarToolbarComponent {
  currentView: 'Month' | 'Week' | 'Day' = 'Week';

  setView(view: 'Month' | 'Week' | 'Day') {
    this.currentView = view;
  }
}
