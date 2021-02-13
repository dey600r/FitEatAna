import { Injectable } from '@angular/core';
import * as Moment from 'moment';

import { Constants } from '@utils/index';

@Injectable({
  providedIn: 'root'
})
export class CalendarService {

  constructor() { }

  getDateFormatFitbit(date: Date): string {
    return Moment(date).format(Constants.FORMAT_DATE_FITBIT);
  }

  getTimeFormatFitbit(date: Date): string {
    return Moment(date).format(Constants.FORMAT_TIME_FITBIT);
  }
}
