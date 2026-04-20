import { Component, Input, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-event-card',
  templateUrl: './event-card.component.html',
  styleUrls: ['./event-card.component.scss'],
  standalone: false,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EventCardComponent {
  @Input() event: any = {}; 
}
