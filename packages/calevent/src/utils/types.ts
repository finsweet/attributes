import dayjs from 'dayjs';

import type { CALENDAR_EVENT_PLATFORMS } from './constants';

/**
 * Defines a calendar event platform type.
 */
export type CalendarEventPlatform = keyof typeof CALENDAR_EVENT_PLATFORMS;

/**
 * Defines a calendar event interface.
 */
export interface CalendarEvent {
  title: string;
  start: string;
  end?: string;
  duration?: [number, dayjs.UnitType];
  allDay?: boolean;
  timezone?: string;
  rRule?: string;
  description?: string;
  location?: string;
  organizer?: CalendarEventOrganizer;
  busy?: boolean;
  guests?: string[];
  url?: string;
}

/**
 * Defines a calendar event organizer interface.
 */
export interface CalendarEventOrganizer {
  name: string;
  email: string;
}

/**
 * Defines a normalized calendar event interface.
 */
export interface NormalizedCalendarEvent extends Omit<CalendarEvent, 'start' | 'end' | 'duration'> {
  startTime: dayjs.Dayjs;
  endTime: dayjs.Dayjs;
}

/**
 * Defines Google calendar event query params Interface.
 */
export interface Google extends Record<string, string | boolean | number | undefined> {
  action: 'TEMPLATE';
  text: string;
  dates: string;
  details?: string;
  location?: string;
  trp?: boolean;
  sprop?: string;
  add?: string;
  src?: string;
  recur?: string;
}

/**
 * Defines an Outlook calendar event query params Interface.
 */
export interface Outlook extends Record<string, string | boolean | number | undefined> {
  path: string;
  rru: string;
  startdt: string;
  enddt: string;
  subject: string;
  allday?: boolean;
  body?: string;
  location?: string;
}

/**
 * Defines an ICS calendar event query params Interface.
 */
export interface Ics extends Record<string, string | boolean | number | undefined> {
  BEGIN: 'VCALENDAR' | 'VEVENT';
  VERSION: number;
  PRODID: string;
  URL: string;
  DTSTART: string;
  DTEND: string;
  DTSTAMP: string;
  RRULE?: string;
  SUMMARY: string;
  DESCRIPTION?: string;
  LOCATION?: string;
  ORGANIZER?: string;
  UID: string;
  END: 'VEVENT' | 'VCALENDAR';
}

/**
 * Defines a calendar event store data object type.
 */
export type CalendarEventStoreData = Pick<
  CalendarEvent,
  'title' | 'start' | 'end' | 'timezone' | 'location' | 'description'
> & {
  eventUrl: URL;
};

/**
 * Defines a calendar event store data object type.
 */
export interface TimeZone {
  label: string;
  tzCode: string;
  name: string;
  utc: string;
}
