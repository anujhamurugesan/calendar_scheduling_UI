import { Component, ChangeDetectionStrategy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-event-modal',
  templateUrl: './event-modal.component.html',
  styleUrls: ['./event-modal.component.scss'],
  standalone: false,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EventModalComponent {
  eventForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.eventForm = this.fb.group({
      title: ['Meet with Jonson Rider', Validators.required],
      date: ['Tuesday, 18 December'],
      startTime: ['06:00'],
      endTime: ['07:00'],
      location: ['Park Lane Office'],
      category: ['Design']
    });
  }

  addEvent() {
    if (this.eventForm.valid) {
      console.log('Event Added', this.eventForm.value);
    }
  }
}
