import type { ManipulateType } from 'dayjs';
import dayjs from 'dayjs';
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';

import type { CalendarEvent, NormalizedCalendarEvent } from '../utils';
import { currentTimezoneCode, isValidTimeZone } from '../utils/timezones';

dayjs.extend(utc);
dayjs.extend(timezone);

/**
 * Converts the calendar event to a normalized calendar event.
 * @param eventDetails The calendar event details.
 * @param toUtc Whether to convert the start and end time to UTC.
 * @returns The normalized calendar event.
 */
export const eventify = (eventDetails: CalendarEvent, toUtc = true): NormalizedCalendarEvent => {
  const { start, end, duration, ...rest } = eventDetails;
  let startTime = toUtc ? dayjs(start).utc() : dayjs(start);
  let endTime = end
    ? toUtc
      ? dayjs(end).utc()
      : dayjs(end)
    : (() => {
        if (eventDetails.allDay) {
          return startTime.add(1, 'day');
        }
        if (duration && duration.length === 2) {
          const value = Number(duration[0]);
          const unit = duration[1] as ManipulateType;
          return startTime.add(value, unit);
        }
        return toUtc ? dayjs().utc() : dayjs();
      })();

  if (isValidTimeZone(eventDetails.timezone)) {
    startTime = startTime.tz(eventDetails.timezone, true);
    endTime = endTime.tz(eventDetails.timezone, true);
  } else {
    startTime = startTime.tz(currentTimezoneCode, true);
    endTime = endTime.tz(currentTimezoneCode, true);
  }

  return {
    ...rest,
    startTime: startTime,
    endTime: endTime,
  };
};
