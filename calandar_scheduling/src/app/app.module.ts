import { NgModule, provideBrowserGlobalErrorListeners } from '@angular/core';
import { BrowserModule, provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app.routes';
import { AppComponent } from './app.component';

import { DashboardComponent } from './components/dashboard/dashboard.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { MiniCalendarComponent } from './components/mini-calendar/mini-calendar.component';
import { MainCalendarComponent } from './components/main-calendar/main-calendar.component';
import { CalendarToolbarComponent } from './components/calendar-toolbar/calendar-toolbar.component';
import { WeekGridComponent } from './components/week-grid/week-grid.component';
import { EventCardComponent } from './components/event-card/event-card.component';
import { EventModalComponent } from './components/event-modal/event-modal.component';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    SidebarComponent,
    MiniCalendarComponent,
    MainCalendarComponent,
    CalendarToolbarComponent,
    WeekGridComponent,
    EventCardComponent,
    EventModalComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule
  ],
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideClientHydration(withEventReplay()),
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
