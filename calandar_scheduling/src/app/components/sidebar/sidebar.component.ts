import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
  standalone: false,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SidebarComponent {
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
}
