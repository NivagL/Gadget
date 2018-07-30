import { Injectable } from '@angular/core';

@Injectable()
export class DateService {

  constructor() { 
  }

  public getDate(): string {
    let date = new Date();
    return this.FormatDate(date);
  }

  public getTime(): string {
    let date = new Date();
    return this.FormatTime(date);
  }
  
  public FormatDate(date: Date): string{
    return this.days[date.getDay()] + ' ' + date.getDate() + ' ' 
      + this.months[date.getMonth()] + ' ' + date.getFullYear(); 
  }

  public FormatTime(date: Date): string{
    return date.getHours() + ':' + date.getMinutes();
  }
  
  public readonly months: string[] = [ 
    "Jan", "Feb", "Mar", "Apr", "May", "Jun", 
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  
  public readonly days: string[] = [
    'Sun','Mon','Tue','Wed','Thu','Fri','Sat'];
}
