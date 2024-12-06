import dayjs from 'dayjs';

import {
  type CalendarEvent,
  type CalendarEventOrganizer,
  type Google,
  type NormalizedCalendarEvent,
  type Outlook,
  TimeFormats,
} from '../utils';
import { getElementHTMLContent, getElementTextContent } from '../utils/html';
import { formatDescription, formatLocation } from '../utils/ics';
import { currentTimezoneCode, isValidTimeZone } from '../utils/timezones';
import { eventify } from './eventify';

/**
 * Format the start and end time.
 * @param {NormalizedCalendarEvent} event start and end time
 * @param dateTimeFormat The date time format i.e 'allDay', 'dateTimeUTC'
 * @returns {Object} The formatted start and end time
 */
function formatTimes(
  { startTime, endTime }: NormalizedCalendarEvent,
  dateTimeFormat: keyof typeof TimeFormats
): { start: string; end: string } {
  const format = TimeFormats[dateTimeFormat];
  return { start: startTime.format(format), end: endTime.format(format) };
}

/**
 * Make the calendar event object.
 * @param element The Html element
 * @param instance The instance index
 * @param scope The element scope
 * @returns The calendar event object
 */
function makeEvent(element: HTMLElement, instance: string | null, scope: HTMLElement | undefined): CalendarEvent {
  const title = getElementTextContent('title', instance, scope) ?? '';
  const start = getElementTextContent('start', instance, scope) ?? '';
  const end: string | undefined = getElementTextContent('end', instance, scope);
  const timezone = getElementTextContent('timezone', instance, scope);
  const location = getElementTextContent('location', instance, scope);
  const description = getElementHTMLContent('description', instance, scope);

  return {
    title,
    start,
    end,
    timezone,
    location,
    description,
  };
}

/**
 * Collects the Google calendar event data.
 * @param trigger The trigger element that was clicked
 * @param instance The instance index
 * @param scope The element scope
 * @returns The Google calendar event data object
 */
export function collectGoogleData(
  trigger: HTMLElement,
  instance: string | null,
  scope: HTMLElement | undefined
): Google {
  const eventDetails = makeEvent(trigger, instance, scope);
  const event = eventify(eventDetails);

  const { start, end } = formatTimes(event, event.allDay ? 'allDay' : 'dateTimeUTC');

  const details: Google = {
    action: 'TEMPLATE',
    text: event.title,
    details: event.description,
    location: event.location,
    trp: event.busy,
    dates: `${start}/${end}`,
    recur: event.rRule ? `RRULE:${event.rRule}` : undefined,
  };

  if (isValidTimeZone(event.timezone)) {
    details.ctz = event.timezone;
  } else {
    details.ctz = currentTimezoneCode;
  }

  if (event.guests?.length) {
    details.add = event.guests.join();
  }

  return details;
}

/**
 * Collects the Outlook calendar event data.
 * @param trigger The trigger element that was clicked
 * @param instance The instance index
 * @param scope The element scope
 * @returns The Outlook calendar event data object
 */
export function collectOutlookData(
  trigger: HTMLElement,
  instance: string | null,
  scope: HTMLElement | undefined
): Outlook {
  const eventDetails = makeEvent(trigger, instance, scope);
  const event = eventify(eventDetails, false);

  const { start, end } = formatTimes(event, 'dateTimeLocal');

  const details: Outlook = {
    path: '/calendar/action/compose',
    rru: 'addevent',
    startdt: start,
    enddt: end,
    subject: event.title,
    body: event.description,
    location: event.location,
    allday: event.allDay || false,
  };

  return details;
}

/**
 * Collects the ICS calendar event data.
 * @param trigger The trigger element that was clicked
 * @param instance The instance index
 * @param scope The element scope
 * @returns The ICS calendar event data object
 */
export function collectIcsData(
  trigger: HTMLElement,
  instance: string | null,
  scope: HTMLElement | undefined
): Record<string, string | CalendarEventOrganizer | undefined>[] {
  const eventDetails = makeEvent(trigger, instance, scope);
  const event = eventify(eventDetails);

  const { start, end } = formatTimes(event, event.allDay ? 'allDay' : 'dateTimeUTC');

  const dateStamp = dayjs(new Date()).utc().format(TimeFormats['dateTimeUTC']);
  const calendarChunks: Record<string, string | CalendarEventOrganizer | undefined>[] = [
    {
      key: 'BEGIN',
      value: 'VCALENDAR',
    },
    {
      key: 'VERSION',
      value: '2.0',
    },
    {
      key: 'PRODID',
      value: event.title,
    },
    {
      key: 'BEGIN',
      value: 'VEVENT',
    },
    {
      key: 'URL',
      value: event.url,
    },
    {
      key: 'DTSTART',
      value: start,
    },
    {
      key: 'DTEND',
      value: end,
    },
    {
      key: 'DTSTAMP',
      value: dateStamp,
    },
    {
      key: 'RRULE',
      value: event.rRule,
    },
    {
      key: 'SUMMARY',
      value: event.title,
    },
    {
      key: 'DESCRIPTION',
      value: formatDescription(event.description ?? ''),
    },
    {
      key: 'LOCATION',
      value: formatLocation(event.location ?? ''),
    },
    {
      key: 'ORGANIZER',
      value: event.organizer,
    },
    {
      key: 'UID',
      value: Math.floor(Math.random() * 100000)
        .toString()
        .replace('.', ''),
    },
    {
      key: 'END',
      value: 'VEVENT',
    },
    {
      key: 'END',
      value: 'VCALENDAR',
    },
  ];

  return calendarChunks;
}
