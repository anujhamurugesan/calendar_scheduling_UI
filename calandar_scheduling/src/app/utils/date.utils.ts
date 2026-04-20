export class DateUtils {
  static formatMonthYear(date: Date): string {
    return date.toLocaleString('default', { month: 'long', year: 'numeric' });
  }

  static isSameDate(date1: Date, date2: Date): boolean {
    return (
      date1.getDate() === date2.getDate() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getFullYear() === date2.getFullYear()
    );
  }

  static isToday(date: Date): boolean {
    return this.isSameDate(date, new Date());
  }

  static getToday(): Date {
    return new Date();
  }
}
