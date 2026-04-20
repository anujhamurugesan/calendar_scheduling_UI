import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export interface EventData {
  title: string;
  time?: string;
  startTime?: string;
  endTime?: string;
  date?: string;
  color?: string;
  top?: string;
  height?: string;
  users?: string[];
  location?: string;
  category?: string;
}

@Injectable({
  providedIn: 'root'
})
export class EventService {
  private eventsSubject = new BehaviorSubject<EventData[]>([]);
  events$: Observable<EventData[]> = this.eventsSubject.asObservable();

  private modalVisibleSubject = new BehaviorSubject<boolean>(false);
  modalVisible$ = this.modalVisibleSubject.asObservable();

  private modalPrefillSubject = new BehaviorSubject<{ date: string, startTime: string, endTime: string, startingTime: number, endingTime: number } | null>(null);
  modalPrefill$ = this.modalPrefillSubject.asObservable();

  private selectedDateSubject = new BehaviorSubject<Date>(new Date());
  selectedDate$ = this.selectedDateSubject.asObservable();

  constructor() {
    this.eventsSubject.next([
      { title: 'Booking taxi app', startTime: '06:00', endTime: '07:30', color: '#bfdbfe', users: ['assets/u1.png', 'assets/u3.png'], date: this.formatDateOffset(0) },
      { title: 'Development meet', startTime: '06:00', endTime: '08:00', color: '#c4b5fd', users: [], date: this.formatDateOffset(0) },
      { title: 'Design onboarding', startTime: '06:00', endTime: '07:10', color: '#a7f3d0', users: [], date: this.formatDateOffset(1) },
      { title: 'Book offsite', startTime: '07:30', endTime: '10:00', color: '#fef08a', users: ['assets/u1.png', 'assets/u2.png'], date: this.formatDateOffset(1) }
    ]);
  }

  addEvent(event: EventData) {
    if (!event.color) event.color = '#bfdbfe';
    if (!event.users) event.users = [];

    const currentEvents = this.eventsSubject.getValue();
    this.eventsSubject.next([...currentEvents, event]);
  }

  deleteEvent(title: string, date: string) {
    const currentEvents = this.eventsSubject.getValue();
    const updatedEvents = currentEvents.filter(ev => !(ev.title === title && ev.date === date));
    this.eventsSubject.next(updatedEvents);
  }

  openModal(date: string, startTime: string, endTime: string, startingTime: number, endingTime: number) {
    this.modalPrefillSubject.next({ date, startTime, endTime, startingTime, endingTime });
    this.modalVisibleSubject.next(true);
  }

  closeModal() {
    this.modalVisibleSubject.next(false);
    this.modalPrefillSubject.next(null);
  }

  setSelectedDate(date: Date) {
    this.selectedDateSubject.next(date);
  }

  private formatDateOffset(offsetDay: number): string {
    const today = new Date();
    const currentDayOfWeek = today.getDay();
    const startOfWeek = new Date(today);
    startOfWeek.setDate(today.getDate() - currentDayOfWeek + offsetDay);

    const year = startOfWeek.getFullYear();
    const month = String(startOfWeek.getMonth() + 1).padStart(2, '0');
    const day = String(startOfWeek.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }
}
