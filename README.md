# Angular Calendar Scheduling Dashboard

A modern, high-performance calendar scheduling application built with **Angular 21**. This project features a premium dual-tone design, clean component architecture, and a focused user experience for managing daily and weekly schedules.

## 🚀 Key Features

- **Dynamic Scheduling Dashboard**: A responsive layout featuring a sidebar, a browsing mini-calendar, and a detailed weekly grid.
- **Event Management**:
  - **Single-Click Creation**: Click any time slot on the grid to instantly open the scheduling modal.
  - **Visual Feedback**: Events are rendered with custom colors and computed positioning based on their duration.
  - **Simplified Management**: Hover over any event card to reveal a delete button for quick removal.
- **Advanced Navigation**:
  - Browse future or past months in the sidebar mini-calendar.
  - "Today" quick-sync to return to the current date and time.
  - Automatic synchronization between the mini-calendar and the main weekly view.
- **Premium Aesthetics**:
  - Clean, vanilla CSS architecture using global CSS variables.
  - Modern typography and a curated "Glassmorphism" inspired color palette.
  - Real-time "Current Time" indicator on the weekly grid.

## 🛠️ Technical Highlights

- **Modern Angular Syntax**: Fully utilizes the latest Angular 17+ control flow (`@if`, `@for`) for optimized template rendering.
- **Performance Optimized**: Implements `ChangeDetectionStrategy.OnPush` across all components to minimize CPU usage and ensure a snappy UI.
- **RxJS State Management**: Uses a centralized `EventService` with reactive streams (`BehaviorSubject`) to handle global application state.
- **Clean Code Architecture**: 
  - Logic is decoupled into reusable utility classes (`DateUtils`).
  - Strict separation between presentational components and data-handling services.

## 🏃 How to Run the App

### Prerequisites
- [Node.js](https://nodejs.org/) (v18.0.0 or higher recommended)
- [Angular CLI](https://angular.io/cli) (v17.0.0 or higher)

### Setup and Installation

1.  **Install dependencies**:
    ```bash
    npm install
    ```

2.  **Start the development server**:
    ```bash
    npm run start
    # OR
    ng serve
    ```

3.  **View the app**:
    Open your browser and navigate to `http://localhost:4200`.

### Building for Production

To create a production-ready bundle, run:
```bash
npm run build
```
The output will be stored in the `dist/` directory.

## 📂 Project Structure

- `src/app/components/`: Modular UI components (Toolbar, Sidebar, WeekGrid, etc.)
- `src/app/services/`: Reactive data services for event and modal management.
- `src/app/utils/`: Shared date calculation and formatting logic.
- `src/styles.scss`: Global design system and CSS variables.

---

*Created as a high-quality deliverable for a modern web scheduling experience.*
