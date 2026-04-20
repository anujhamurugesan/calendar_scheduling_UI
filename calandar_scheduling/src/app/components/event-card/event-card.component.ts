import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { EventService } from '../../services/event.service';

@Component({
  selector: 'app-event-card',
  templateUrl: './event-card.component.html',
  styleUrls: ['./event-card.component.scss'],
  standalone: false,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EventCardComponent {
  @Input() event: any = {};

  constructor(private eventService: EventService) { }

  onDelete(e: MouseEvent) {
    e.stopPropagation();
    if (this.event.title && this.event.date) {
      this.eventService.deleteEvent(this.event.title, this.event.date);
    }
  }
}
