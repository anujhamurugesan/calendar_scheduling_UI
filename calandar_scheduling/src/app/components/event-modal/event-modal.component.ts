import { Component, ChangeDetectionStrategy, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EventService } from '../../services/event.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-event-modal',
  templateUrl: './event-modal.component.html',
  styleUrls: ['./event-modal.component.scss'],
  standalone: false,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EventModalComponent implements OnInit, OnDestroy {
  eventForm: FormGroup;
  private prefillSub!: Subscription;

  startingTime: number = 0;
  endingTime: number = 0;

  constructor(private fb: FormBuilder, public eventService: EventService, private cdr: ChangeDetectorRef) {
    const now = new Date();
    const currHour = String(now.getHours()).padStart(2, '0');
    const currMin = String(now.getMinutes()).padStart(2, '0');
    const nextHour = String(now.getHours() + 1).padStart(2, '0');

    this.eventForm = this.fb.group({
      title: ['', Validators.required],
      date: ['', Validators.required],
      startTime: [`${currHour}:${currMin}`, Validators.required],
      endTime: [`${nextHour}:${currMin}`, Validators.required],
      location: [''],
      category: ['Design']
    });
  }

  ngOnInit() {
    this.prefillSub = this.eventService.modalPrefill$.subscribe(prefill => {
      if (prefill) {
        this.startingTime = prefill.startingTime;
        this.endingTime = prefill.endingTime;
        this.eventForm.patchValue({
          date: prefill.date,
          startTime: prefill.startTime,
          endTime: prefill.endTime,
          title: '',
          location: '',
          category: 'Design'
        });
        this.cdr.markForCheck();
      }
    });
  }

  ngOnDestroy() {
    if (this.prefillSub) this.prefillSub.unsubscribe();
  }

  addEvent() {
    if (this.eventForm.valid) {
      const formVal = this.eventForm.value;

      let color = '#bfdbfe';
      if (formVal.category === 'Design') color = '#e0e7ff';
      if (formVal.category === 'Personal project') color = '#fef3c7';
      if (formVal.category === 'Developer task') color = '#dbeafe';

      this.eventService.addEvent({
        title: formVal.title,
        date: formVal.date,
        startTime: formVal.startTime,
        endTime: formVal.endTime,
        location: formVal.location,
        category: formVal.category,
        color: color,
        time: `${formVal.startTime} - ${formVal.endTime}`
      });

      this.closeModal();
    }
  }

  closeModal() {
    this.eventForm.reset();
    this.eventService.closeModal();
  }
}
